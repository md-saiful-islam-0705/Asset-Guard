import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Button, Input, Typography } from "@material-tailwind/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AssetRequestModal from "./AssetRequestModal";
import { Helmet } from "react-helmet-async";

const RequestAsset = () => {
  const [assets, setAssets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchAssets = async () => {
        const response = await axiosSecure.get("/assets");
        setAssets(response.data);
    };

    fetchAssets();
  }, [axiosSecure]);

  const handleFilterByStockStatus = (status) => {
    setFilterStatus(status);
  };

  const handleFilterByType = (type) => {
    setFilterType(type);
  };

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const filteredAssets = assets.filter((asset) => {
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "available" && asset.quantity > 0) ||
      (filterStatus === "out-of-stock" && asset.quantity === 0);

    const matchesType =
      filterType === "all" ||
      (filterType === "Returnable" && asset.type === "Returnable") ||
      (filterType === "Non-Returnable" && asset.type === "Non-Returnable");

    const matchesSearch = asset.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesStatus && matchesType && matchesSearch;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);
    document.getElementById("asset_request_modal").showModal();
  };

  return (
    <div className="p-5">
      <Helmet>
            <title>
                Asset Request
            </title>
        </Helmet>
      <div>
        <Typography variant="h5" color="blue-gray">
          Request for an Asset
        </Typography>
      </div>
      <div className="my-4">
        <div className="flex gap-4 justify-between items-center">
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md py-1 px-2 text-sm"
              value={filterStatus}
              onChange={(e) => handleFilterByStockStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select
              className="border border-gray-300 rounded-md py-1 px-2 text-sm"
              value={filterType}
              onChange={(e) => handleFilterByType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={(e) => handleSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="h-[700px] mt-10 overflow-y-auto">
        <table className=" w-full text-left border">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Asset Name
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Asset Type
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Availability
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
            {currentItems.map((asset) => (
              <tr key={asset._id}>
                <td className="p-2 border-b border-blue-gray-50 font-semibold text-gray-700">
                  {asset.name}
                </td>
                <td
                  className={`p-2 border-b border-blue-gray-50 ${
                    asset.type === "Returnable"
                      ? "text-blue-300"
                      : "text-orange-300"
                  }`}
                >
                  {asset.type}
                </td>
                <td
                  className={`p-2 border-b border-blue-gray-50 ${
                    asset.quantity > 0 ? "text-green-300" : "text-red-500"
                  }`}
                >
                  {asset.quantity > 0
                    ? `Available (${asset.quantity})`
                    : "Out of Stock"}
                </td>

                <td className="p-2 border-b ">
                  <button
                    className="btn btn-outline border-gray-300"
                    onClick={() => handleOpenModal(asset)}
                    disabled={asset.quantity === 0}
                  >
                    Request
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AssetRequestModal selectedAsset={selectedAsset} />
      <div className="flex items-center justify-end border-t border-blue-gray-50 p-4">
        <Button
          variant="outlined"
          color="purple"
          size="sm"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography variant="small" color="blue-gray" className="mx-2">
          Page {currentPage}
        </Typography>
        <Button
          variant="outlined"
          color="blue"
          size="sm"
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastItem >= filteredAssets.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RequestAsset;
