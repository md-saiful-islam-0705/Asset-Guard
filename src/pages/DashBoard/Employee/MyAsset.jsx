import  { useState, useEffect } from "react";
import {
  Input,
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const MyAsset = () => {
  const [assetRequests, setAssetRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAssetRequests = async () => {
      try {
        const response = await axiosSecure.get("/asset-requests", {
          params: {
            userId: "Your_User_Id",
            searchTerm,
            filterStatus,
            filterType,
          },
        });
        setAssetRequests(response.data);
      } catch (error) {
        console.error("Error fetching asset requests:", error);
      }
    };

    fetchAssetRequests();
  }, [axiosSecure, searchTerm, filterStatus, filterType]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterStatusChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  return (
    <div>
      {/* Search Section */}
      <div className="flex items-center">
        <Input
          label="Search"
          placeholder="Search by asset name"
          value={searchTerm}
          onChange={handleSearchTermChange}
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
        {/* Filter Section */}
        <select
          value={filterStatus}
          onChange={handleFilterStatusChange}
          className="ml-4 border border-gray-300 rounded-md py-1 px-2 text-sm"
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
        <select
          value={filterType}
          onChange={handleFilterTypeChange}
          className="ml-4 border border-gray-300 rounded-md py-1 px-2 text-sm"
        >
          <option value="all">All</option>
          <option value="returnable">Returnable</option>
          <option value="non-returnable">Non-Returnable</option>
        </select>
      </div>

      {/* Asset List Section */}
      <Card className="mt-4">
        <CardBody>
          <Typography color="blue-gray">Asset List</Typography>
          <table className="mt-4 w-full  text-left border">
            {/* Table Header */}
            <thead>
              <tr>
                <th className="p-4 border-b border-blue-gray-200">Asset Name</th>
                <th className="p-4 border-b border-blue-gray-200">Asset Type</th>
                <th className="p-4 border-b border-blue-gray-200">Request Date</th>
                <th className="p-4 border-b border-blue-gray-200">Approval Date</th>
                <th className="p-4 border-b border-blue-gray-200">Request Status</th>
                <th className="p-4 border-b border-blue-gray-200">Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {assetRequests.map((assetRequest) => (
                <tr key={assetRequest._id} className="hover:bg-blue-50">
                  <td className="p-4 border-b border-blue-gray-200">{assetRequest.assetName}</td>
                  <td className="p-4 border-b border-blue-gray-200">{assetRequest.assetType}</td>
                  <td className="p-4 border-b border-blue-gray-200">{new Date(assetRequest.requestDate).toLocaleDateString('en-GB')}</td>
                  <td className="p-4 border-b border-blue-gray-200">{assetRequest.approvalDate}</td>
                  <td className="p-4 border-b text-red-300 border-blue-gray-200">{assetRequest.requestStatus}</td>
                  <td className="p-4 border-b border-blue-gray-200">
                    {/* Action Button */}
                    {/* Implement Return Button logic here based on requirements */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default MyAsset;
