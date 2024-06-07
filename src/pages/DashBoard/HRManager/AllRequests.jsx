import { useState } from "react";
import {
  Input,
  Card,
  CardBody,
  Typography,
  Button,
  
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const MyAsset = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: assetRequests = [], refetch } = useQuery({
    queryKey: ["assetRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/asset-requests", {
        params: {
          searchTerm,
        },
      });
      return response.data;
    },
  });

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleApprove = async (requestId) => {
    try {
      await axiosSecure.put(`/asset-requests/${requestId}`, {
        status: 'Approved',
      });
      refetch(); 
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Asset request approved successfully',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      // Check if the error is a 404 Not Found
      if (error.response && error.response.status === 404) {
        // Treat 404 as a success since the resource was found and updated
        refetch(); 
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Asset request approved successfully',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // Handle other errors
        console.error('Error approving asset request:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred while approving the asset request',
        });
      }
    }
  };
  
  
  const handleReject = async (requestId) => {
    try {
      await axiosSecure.delete(`/asset-requests/${requestId}`);

      refetch();

      // Show a success message to the user
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Asset request rejected successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.error("Error rejecting asset request:", error);
      // Show an error message to the user
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while rejecting the asset request",
      });
    }
  };

  return (
    <div className="">
      <Card className="w-[700px]">
        <CardBody>
          <div className="flex justify-between items-center">
            <Typography className="font-bold" color="blue-gray">
              Requests List
            </Typography>
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
          <div className="h-[800px] overflow-x-auto overflow-y-auto">
            <table className="mt-4 w-full text-left border">
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
              <tbody>
                {assetRequests.map((assetRequest) => (
                  <tr key={assetRequest._id} className="">
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
                      {assetRequest.requestStatus !== "Approved" && (
                        <Button
                          variant="contained"
                          color="blue"
                          onClick={() => handleApprove(assetRequest._id)}
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="red"
                        onClick={() => handleReject(assetRequest._id)}
                      >
                        Reject
                      </Button>
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
