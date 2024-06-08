import { useState, useEffect, useContext } from "react";
import {
  Input,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { PDFDownloadLink } from "@react-pdf/renderer";
import AssetDetailsPDF from "./AssetDetailsPdf";
import { FaPrint } from "react-icons/fa";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";

const MyAsset = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [returningAssets] = useState([]);
  const [returnedAssets, setReturnedAssets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: assetRequests = [], refetch } = useQuery({
    queryKey: ["assetRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/asset-requests", {
        params: { userEmail: user.email },
      });
      return response.data;
    },
  });
  useEffect(() => {
    const storedReturnedAssets = JSON.parse(
      localStorage.getItem("returnedAssets")
    );
    if (storedReturnedAssets) {
      setReturnedAssets(storedReturnedAssets);
    }
  }, []);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleRemoveOrReturn = async (requestId) => {
    try {
      await axiosSecure.delete(`/asset-requests-remove/${requestId}`);
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asset request removed successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error removing asset request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while removing the asset request",
      });
    }
  };

  const handleReturn = async (assetId) => {
    try {
      await axiosSecure.put(`/assets/return/${assetId}`);
      refetch();
      setReturnedAssets((prevReturnedAssets) => [
        ...prevReturnedAssets,
        assetId,
      ]);
      localStorage.setItem(
        "returnedAssets",
        JSON.stringify([...returnedAssets, assetId])
      );
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asset returned successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error returning asset:", error);
    }
  };

  // Filtering logic
  const filteredAssets = assetRequests.filter((assetRequest) => {
    const matchesStatus =
      filterStatus === "all" ||
      assetRequest.requestStatus.toLowerCase() === filterStatus;

    const matchesType =
      filterType === "all" ||
      (filterType === "returnable" &&
        assetRequest.assetType === "Returnable") ||
      (filterType === "non-returnable" &&
        assetRequest.assetType === "Non-Returnable");

    const matchesSearch = assetRequest.assetName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="">
      {/* Filter and Search Section */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <select
            value={filterStatus}
            onChange={handleFilterStatusChange}
            className="ml-4 border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="all">Asset Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="returned">Returned</option>
          </select>
          <select
            value={filterType}
            onChange={handleFilterTypeChange}
            className="ml-4 border border-gray-300 rounded-md p-2 text-sm"
          >
            <option value="all">Asset Type</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-Returnable</option>
          </select>
        </div>
        <div className="w-full md:w-72">
          <Input
            label="Search"
            placeholder="Search by asset name"
            value={searchTerm}
            onChange={handleSearchTermChange}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* Asset List Section */}
      <Card className="mt-4 h-[800px] w-full border">
        <CardBody>
          <Typography
            color="blue-gray"
            className="font-bold text-blue-500 mb-3"
          >
            Asset List
          </Typography>
          <div className="h-[700px] overflow-y-auto overflow-x-scroll">
            <table className="mt-4 w-full text-left border">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="p-4 border-b border-blue-gray-200">
                    Asset Name
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">
                    Asset Type
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">
                    Request Date
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">
                    Approval Date
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">
                    Request Status
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">Action</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {currentItems.map((assetRequest) => (
                  <tr key={assetRequest._id}>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.assetName}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200 ">
                      {assetRequest.assetType}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {new Date(assetRequest.requestDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.approvalDate
                        ? new Date(
                            assetRequest.approvalDate
                          ).toLocaleDateString("en-GB")
                        : "N/A"}
                    </td>
                    <td
                      className={`p-4 border-b font-bold border-blue-gray-200 ${
                        assetRequest.requestStatus === "Pending"
                          ? "text-red-500"
                          : assetRequest.requestStatus === "Approved"
                          ? "text-green-500"
                          : ""
                      }`}
                    >
                      {assetRequest.requestStatus}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.requestStatus === "Pending" && (
                        <Button
                          onClick={() => handleRemoveOrReturn(assetRequest._id)}
                          color="red"
                        >
                          Remove
                        </Button>
                      )}
                      {assetRequest.assetType === "Returnable" &&
                        assetRequest.requestStatus === "Approved" &&
                        !assetRequest.returned && (
                          <Button
                            onClick={() => handleReturn(assetRequest.assetId)}
                            color="red"
                            disabled={
                              returningAssets.includes(assetRequest.assetId) ||
                              returnedAssets.includes(assetRequest.assetId)
                            }
                          >
                            {returningAssets.includes(assetRequest.assetId)
                              ? "Returned"
                              : `Return`}
                          </Button>
                        )}
                      {assetRequest.requestStatus === "Approved" && (
                        <Button
                          color="blue"
                          className="font-bold my-1 text-center"
                        >
                          <PDFDownloadLink
                            document={
                              <AssetDetailsPDF assetRequest={assetRequest} />
                            }
                            fileName="asset-details.pdf"
                          >
                            {({ loading }) =>
                              loading ? (
                                "Loading..."
                              ) : (
                                <div className="flex gap-1 justify-between items-center">
                                  <p>Print</p>
                                  <FaPrint />
                                </div>
                              )
                            }
                          </PDFDownloadLink>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end p-4">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="small" color="blue-gray" className="mx-2">
          Page {currentPage} of{" "}
          {Math.ceil(filteredAssets.length / itemsPerPage)}
        </Typography>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={
            currentPage === Math.ceil(filteredAssets.length / itemsPerPage)
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MyAsset;
