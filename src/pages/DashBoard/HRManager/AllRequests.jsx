import { useState, useEffect } from "react";
import {
  Input,
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyAsset = () => {
  const [assetRequests, setAssetRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAssetRequests = async () => {
      try {
        const response = await axiosSecure.get("/asset-requests", {
          params: {
            searchTerm,
          },
        });
        setAssetRequests(response.data);
      } catch (error) {
        console.error("Error fetching asset requests:", error);
      }
    };

    fetchAssetRequests();
  }, [axiosSecure, searchTerm]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="">
      <Card className=" w-[700px] ">
        <CardBody>
          <div className="flex justify-between items-center">
            <Typography className="font-bold" color="blue-gray ">Requests List</Typography>
            <div className="flex items-center mb-4">
              <Input
                label="Search"
                placeholder="Search by requester name or email"
                value={searchTerm}
                onChange={handleSearchTermChange}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
          <div className="  h-[800px] overflow-x-auto overflow-y-auto">
            <table className="mt-4 w-full text-left border">
              {/* Table Header */}
              <thead>
                <tr>
                  <th className="p-2 border-b border-blue-gray-200">
                    Asset Name
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Asset Type
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Email of Requester
                  </th>
                  <th className="p-2 border-b border-blue-gray-200">
                    Name of Requester
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">
                    Request Date
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">
                    Additional Note
                  </th>
                  <th className="p-4 border-b border-blue-gray-200">Status</th>
                  <th className="p-4 border-b border-blue-gray-200">Actions</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {assetRequests.map((assetRequest) => (
                  <tr key={assetRequest._id} className="hover:bg-blue-50">
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.assetName}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.assetType}
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
                      {assetRequest.additionalNote}
                    </td>
                    <td className="p-4 border-b border-blue-gray-200">
                      {assetRequest.status}
                    </td>
                    <td className="p-4 space-y-1 border-b border-blue-gray-200">
                      <Button color="blue">Approve</Button>
                      <Button color="red">Reject</Button>
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

export default MyAsset;
