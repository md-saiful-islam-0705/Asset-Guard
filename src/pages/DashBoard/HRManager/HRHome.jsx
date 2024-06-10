import { Card, CardBody, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { PieChart } from "react-minimal-pie-chart";
import Calendar from 'react-calendar';
import { useEffect, useState } from "react";

const HRHome = () => {
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState(new Date());

  // Fetch items with limited stock
  const { data: limitedStockItems = [] } = useQuery({
    queryKey: ["limitedStockItems"],
    queryFn: async () => {
      const response = await axiosSecure.get("/assets");
      return response.data.filter((asset) => asset.quantity < 10);
    },
  });

  // Fetch pending requests
  const { data: pendingRequests = [] } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: async () => {
      const response = await axiosSecure.get("/asset-requests/all");
      return response.data
        .filter((request) => request.requestStatus === "Pending")
        .slice(0, 5);
    },
  });

  // Fetch top requested items
  const { data: topRequestedItems = [] } = useQuery({
    queryKey: ["topRequestedItems"],
    queryFn: async () => {
      const response = await axiosSecure.get("/asset-requests/all");
      const topRequested = response.data.reduce((acc, curr) => {
        if (!acc[curr.assetName]) {
          acc[curr.assetName] = 1;
        } else {
          acc[curr.assetName]++;
        }
        return acc;
      }, {});
      const sorted = Object.entries(topRequested).sort((a, b) => b[1] - a[1]);
      return sorted.slice(0, 4);
    },
  });

  // Fetch returnable and non-returnable items
  const { data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const response = await axiosSecure.get("/assets");
      return response.data;
    },
  });
  useEffect(() => {
    setDate(new Date());
  }, []);

  // Calculate the total percentage of returnable and non-returnable items
  const returnableCount = assets.filter(
    (asset) => asset.type === "Returnable"
  ).length;
  const nonReturnableCount = assets.filter(
    (asset) => asset.type === "Non-Returnable"
  ).length;
  const totalItemCount = returnableCount + nonReturnableCount;
  const returnablePercentage = (returnableCount / totalItemCount) * 100;
  const nonReturnablePercentage = (nonReturnableCount / totalItemCount) * 100;

  // Data for the pie chart
  const data = [
    { title: "Returnable", value: returnablePercentage, color: "#11b8fa" },
    {
      title: "Non-Returnable",
      value: nonReturnablePercentage,
      color: "#970ced",
    },
  ];

  return (
    <div className=" grid lg:grid-cols-2 md:grid-cols-2 gap-4">
      {/* Pending Requests Section */}
      <Card className="mt-4 h-[300px] w-full border border-blue-100">
        <CardBody>
          <Typography
            color="blue-gray"
            className="font-bold text-blue-500 mb-3"
          >
            <div className="flex flex-row justify-between items-center">
                <span>Pending Requests</span>
                <span>({pendingRequests.length})</span>
            </div>
          </Typography>
          <ul className="border p-2 rounded-xl">
            {pendingRequests.map((request) => (
              <li key={request._id}>{request.assetName}</li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Top Requested Items Section */}
      <Card className="mt-4 h-[300px] w-full border border-purple-100">
        <CardBody className="overflow-y-auto">
          <Typography
            color="blue-gray"
            className="font-bold text-purple-500 mb-3"
          >
            <div className="flex flex-row justify-between items-center">
              <span>Top Requested Items</span>
              <span>({topRequestedItems.length})</span>
            </div>
          </Typography>
          <ul className="border p-2 rounded-xl">
            {topRequestedItems.map((item) => (
              <li key={item[0]} className="font-semibold text-gray-700">
                <div className="flex flex-row justify-between items-center">
                  <span>{item[0]} </span>
                  <span>{item[1]} times</span>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>

      {/* Limited Stock Items Section */}
      <Card className="mt-4 h-[300px] w-full border border-red-100">
        <CardBody className="overflow-y-auto">
          <Typography color="blue-gray" className="font-bold text-red-500 mb-3">
            Limited Stock Items
          </Typography>
          <ul className="border p-2 rounded-xl">
            {limitedStockItems.map((asset) => (
              <li key={asset._id} className="text-gray-700 font-semibold">
                <div className="flex flex-row justify-between items-center">
                  <span>{asset.name}</span> <span>{asset.quantity}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardBody>
      </Card>
      {/* Pie Chart Section */}
      <Card className="mt-4 h-[300px] w-full border border-indigo-100">
        <CardBody className="flex flex-col items-center">
          <Typography color="blue-gray" className="font-bold mb-3">
            <span className="text-blue-500">Returnable</span> /{" "}
            <span className="text-purple-500">Non-Returnable</span>
          </Typography>
          <div style={{ width: "200px", height: "200px" }}>
            <PieChart
              data={data}
              label={({ dataEntry }) => `${Math.round(dataEntry.percentage)} %`}
              labelStyle={(index) => ({
                fill: data[index].color,
                fontSize: "5px",
                fontFamily: "sans-serif",
              })}
            />
          </div>
        </CardBody>
      </Card>
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
      <Card className="mt-4 h-[300px] w-full border border-orange-100">
        <CardBody className="overflow-y-auto">
          <Typography color="blue-gray" className="font-bold text-orange-500 mb-3">
            Calendar
          </Typography>
          <div className="flex justify-center items-center border p-2 rounded-xl">
            <Calendar
              onChange={setDate}
              value={date}
            />
          </div>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default HRHome;
