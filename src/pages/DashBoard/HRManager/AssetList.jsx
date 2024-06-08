import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
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
import EditAssetModal from "./EditAssetModal";

const AssetList = () => {
  const [assets, setAssets] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [editingAsset, setEditingAsset] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
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
    const sortedAssets = [...assets].sort((a, b) =>
      sortOrder === "asc" ? a.quantity - b.quantity : b.quantity - a.quantity
    );
    setAssets(sortedAssets);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleFilterByStockStatus = (status) => setFilterStatus(status);

  const handleFilterByType = (type) => setFilterType(type);

  const handleSearchQuery = (query) => setSearchQuery(query);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDeleteAsset = async (assetId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/assets/${assetId}`);
          if (res.data.deletedCount > 0) {
            setAssets(assets.filter((asset) => asset._id !== assetId));
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Asset has been deleted",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while deleting the asset",
          });
        }
      }
    });
  };

  const handleUpdateAsset = async (updatedAsset) => {
    try {
      const res = await axiosSecure.patch(
        `/assets/${updatedAsset._id}`,
        updatedAsset
      );
      if (res.data.modifiedCount > 0) {
        const updatedAssets = assets.map((asset) =>
          asset._id === updatedAsset._id ? updatedAsset : asset
        );
        setAssets(updatedAssets);
        setEditingAsset(null);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asset has been updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while updating the asset",
      });
    }
  };

  const handleEditAsset = (asset) => {
    setEditingAsset(asset);
  };

  return (
    <div className="h-full">
      <div>
        <Typography variant="h5" color="blue-gray">
          Asset List
        </Typography>
      </div>
      <div className="my-4 ">
        <div className="flex gap-4 lg:flex-row flex-col justify-between items-center">
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md py-1 px-2 text-sm"
              onChange={(e) => handleFilterByStockStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
            <select
              className="border border-gray-300 rounded-md py-1 px-2 text-sm"
              onChange={(e) => handleFilterByType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-Returnable">Non-Returnable</option>
            </select>
            <Button onClick={handleSortByQuantity}>
              Sort by Quantity {sortOrder === "asc" ? "↑" : "↓"}
            </Button>
          </div>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => handleSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Card className="w-full h-[800px] border overflow-y-auto">
        <CardHeader floated={false} shadow={false} className="rounded-none" />
        <CardBody className="px-0 relative">
          <p className="absolute left-4 -top-0 font-bold text-blue-500">
            Assets ({filteredAssets.length})
          </p>
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
              {currentItems.map((asset) => (
                <tr key={asset._id}>
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
                  <td className="p-4 border-b border-blue-gray-50 flex items-center gap-2">
                    <Tooltip content="Edit Asset">
                    <IconButton
                        variant="text"
                        className="text-blue-500"
                        onClick={() => handleEditAsset(asset)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Asset">
                      <IconButton
                        variant="text"
                        color="blue-gray"
                        onClick={() => handleDeleteAsset(asset._id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {editingAsset && (
            <EditAssetModal
              editingAsset={editingAsset}
              onClose={() => setEditingAsset(null)}
              onUpdate={handleUpdateAsset}
            />
          )}
        </CardBody>
        <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4">
          <Button
            variant="outlined"
            color="blue-gray"
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
            color="blue-gray"
            size="sm"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentItems.length < itemsPerPage}
          >
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssetList;
