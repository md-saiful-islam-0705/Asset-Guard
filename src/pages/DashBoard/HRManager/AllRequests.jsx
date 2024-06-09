import { useState } from "react";
import {
  Input,
  Card,
  CardBody,
  Typography,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllRequest = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const axiosSecure = useAxiosSecure();

  const { data: assetRequests = [], refetch } = useQuery({
    queryKey: ["assetRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/asset-requests/all");
      return response.data;
    },
  });
  

  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/assets");
      return response.data;
    },
  });

  const getAssetQuantity = (assetId) => {
    const asset = assets.find((a) => a._id === assetId);
    return asset ? asset.quantity : "N/A";
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatusChange = (status) => {
    setFilterStatus(status);
  };

  const handleFilterTypeChange = (type) => {
    setFilterType(type);
  };

  const handleApprove = async (requestId) => {
    try {
      await axiosSecure.put(`/asset-requests/${requestId}`, {
        status: "Approved",
      });

      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asset request approved successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asset request approved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        console.error("Error approving asset request:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "An error occurred while approving the asset request",
        });
      }
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axiosSecure.delete(`/asset-requests/${requestId}`);

      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asset request rejected successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error rejecting asset request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while rejecting the asset request",
      });
    }
  };

  const handleCancelApproval = async (requestId) => {
    try {
      await axiosSecure.put(`/asset-requests/cancel/${requestId}`, {
        status: "Pending",
      });

      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Approval cancelled successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error cancelling approval:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while cancelling the approval",
      });
    }
  };

  const filteredRequests = assetRequests.filter((request) => {
    const matchesStatus =
      filterStatus === "all" || request.requestStatus === filterStatus;

    const matchesType =
      filterType === "all" || request.assetType === filterType;

    const matchesSearch =
      request.user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.assetType.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  return (
    <div className=" w-full">
      <div className=" my-4 flex lg:flex-row flex-col gap-4 justify-center ">
       
        <div className="flex gap-4 items-center justify-between">
          <div className="flex justify-between items-center lg:flex-row gap-2 flex-col">
            <Select
              className=""
              value={filterStatus}
              onChange={(e) => handleFilterStatusChange(e)}
            >
              <Option value="all">All Statuses</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Approved">Approved</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
            <Select
              className="w-full"
              value={filterType}
              onChange={(e) => handleFilterTypeChange(e)}
            >
              <Option value="all">All Types</Option>
              <Option value="Returnable">Returnable</Option>
              <Option value="Non-Returnable">Non-Returnable</Option>
            </Select>
          </div>
        </div>
        <div>
          <Input
            label="Search"
            placeholder="Search by name, email, asset name, or type"
            value={searchTerm}
            onChange={handleSearchTermChange}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <Card className="w-full max-w-7xl">
        <CardBody>
          <Typography
            className="font-bold py-2 text-blue-500"
            color="blue-gray"
          >
            Requests List
          </Typography>
          <div className="h-[800px] overflow-x-auto overflow-y-auto">
            <table className="w-full text-left border">
              <thead>
                <tr>
                  <th className="p-2 border-b border-blue-gray-200">
                    Asset Name
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Asset Type
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Asset Quantity
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Email of Requester
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Name of Requester
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Request Date
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Additional Note
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">Status</th>
                  <th className="p-2 border-b border-blue-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((assetRequest) => (
                  <tr key={assetRequest._id}>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.assetName}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.assetType}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {getAssetQuantity(assetRequest.assetId)}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.user.userEmail}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.user.userName}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {new Date(assetRequest.requestDate).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.additionalNotes}
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
                    <td className="p-4 space-y-1 border-b border-blue-gray-200">
                      {assetRequest.requestStatus !== "Approved" ? (
                        <>
                          <Button
                            variant="contained"
                            color="blue"
                            onClick={() => handleApprove(assetRequest._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            color="red"
                            onClick={() => handleReject(assetRequest._id)}
                          >
                            Reject
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          color="red"
                          onClick={() => handleCancelApproval(assetRequest._id)}
                        >
                          Cancel Approval
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
    </div>
  );
};

export default AllRequest;