import { useEffect, useState } from "react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EmployeeHome = () => {
  const axiosSecure = useAxiosSecure();
  const [monthlyRequests, setMonthlyRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);

  // Define the useQuery hook for fetching asset requests
  const { data: assetRequests = [] } = useQuery({
    queryKey: ["assetRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/asset-requests");
      return response.data;
    },
  });

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const filteredMonthlyRequests = assetRequests
      .filter((request) => {
        const requestDate = new Date(request.requestDate);
        return (
          requestDate.getMonth() === currentMonth &&
          requestDate.getFullYear() === currentYear
        );
      })
      .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
    setMonthlyRequests(filteredMonthlyRequests);

    // Filter pending requests
    const filteredPendingRequests = assetRequests.filter(
      (request) => request.requestStatus === "Pending"
    );
    setPendingRequests(filteredPendingRequests);
  }, [assetRequests]);

  return (
    <div>
      <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4">
        <Card className="mt-4 h-[400px] w-full border border-blue-100 ">
          <CardBody className="overflow-y-auto ">
            <div className="flex items-center justify-between ">
              <Typography
                color="blue-gray"
                className="font-bold text-blue-500 mb-3"
              >
                My Monthly Requests{" "}
              </Typography>
              <Typography className="font-bold text-blue-500 mb-3">
                ({new Date().toLocaleString("default", { month: "long" })})
              </Typography>
            </div>
            {monthlyRequests.length > 0 ? (
              <div className="border-2 p-2 rounded-lg overflow-y-auto">
                <ul>
                  {monthlyRequests.map((request) => (
                    <li key={request._id}>
                      <span className="font-semibold">
                        {request.assetName} -{" "}
                      </span>
                      <span className="text-gray-500">
                        {new Date(request.requestDate).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No requests made this month</p>
            )}
          </CardBody>
        </Card>
        <Card className="mt-4 h-[400px] w-full border border-orange-100">
          <CardBody className="overflow-y-auto">
            <div className="flex justify-between">
              <Typography
                color="blue-gray"
                className="font-bold text-orange-500 mb-3"
              >
                My Pending Requests
              </Typography>
              <Typography
                color="blue-gray"
                className="font-bold text-orange-500 mb-3"
              >
                ({pendingRequests.length})
              </Typography>
            </div>
            {pendingRequests.length > 0 ? (
              <div className="border-2 p-2 rounded-lg overflow-y-auto ">
                <ol type="I">
                  {pendingRequests.map((request) => (
                    <li key={request._id}>{request.assetName}</li>
                  ))}
                </ol>
              </div>
            ) : (
              <p>No pending requests</p>
            )}
          </CardBody>
        </Card>
      </div>
      <Card className="mt-4 h-[400px] w-full border border-purple-100">
        <CardBody className="overflow-y-auto">
          <div className="flex justify-between">
            <Typography
              color="blue-gray"
              className="font-bold text-purple-500 mb-3"
            >
              Announcement
            </Typography>
            <Typography
              color="blue-gray"
              className="font-bold text-purple-500 mb-3"
            >
              (1)
            </Typography>
          </div>

          <div className="border-2 p-2 rounded-lg overflow-y-auto ">
            <Typography>
              We are excited to announce the launch of our new Asset Management
              System! This comprehensive solution is designed to revolutionize
              the way we manage our assets, providing us with greater control,
              visibility, and efficiency.
            </Typography>
            <Typography className="mt-2">
              With our Asset Management System, we can now track and monitor all
              our assets in real-time, ensuring their optimal utilization and
              maintenance. From physical equipment to digital resources,
              everything is now centralized and easily accessible.
            </Typography>
            <Typography className="mt-2">
              Additionally, our system allows us to generate insightful reports
              and analytics, empowering us to make data-driven decisions and
              optimize our asset management strategies. This enhances our
              operational efficiency and reduces unnecessary costs.
            </Typography>
            <Typography className="mt-2">
              We encourage all employees to familiarize themselves with the new
              system and leverage its capabilities to streamline their workflows
              and improve productivity. Together, let embrace this exciting
              advancement in our asset management practices!
            </Typography>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default EmployeeHome;
