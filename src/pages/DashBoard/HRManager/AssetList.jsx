import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, PencilIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axiosSecure.get("/assets");
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [axiosSecure]);

  const handleSortByQuantity = () => {
    // Sort assets by quantity
    const sortedAssets = [...assets].sort(
      (a, b) => a.quantity - b.quantity
    );
    setAssets(sortedAssets);
  };

  const handleFilterByStockStatus = (status) => {
    setFilterStatus(status);
  };

  const filteredAssets = assets.filter((asset) => {
    if (filterStatus === "available") {
      return asset.quantity > 0;
    } else if (filterStatus === "out-of-stock") {
      return asset.quantity === 0;
    }
    return true;
  });

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div>
          <Typography variant="h5" color="blue-gray">
            Asset List
          </Typography>
        </div>
        <div className="my-4 ">
          <div className="flex gap-4 justify-between items-center">
            <div className="flex gap-4">
              <select
                className="border border-gray-300 rounded-md py-1 px-2 text-sm"
                onChange={(e) => handleFilterByStockStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="available">Available</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
              <Button onClick={handleSortByQuantity}>Sort by Quantity</Button>
            </div>
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Product Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Product Type
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Product Quantity
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Date Added
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.map((asset, index) => (
              <tr key={index}>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {asset.name}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {asset.type}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {asset.quantity}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                     {new Date(asset.createdAt).toLocaleDateString()}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <Tooltip content="Edit Asset">
                    <IconButton variant="text">
                      <PencilIcon className="h-4 w-4" />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AssetList;
