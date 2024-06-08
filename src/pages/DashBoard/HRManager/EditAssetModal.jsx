import { Dialog } from "@material-tailwind/react";
import { useEffect, useState } from "react";

const EditAssetModal = ({ editingAsset, onClose, onUpdate }) => {
  const [updatedAsset, setUpdatedAsset] = useState(editingAsset);

  useEffect(() => {
    setUpdatedAsset(editingAsset);
  }, [editingAsset]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAsset((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(updatedAsset);
  };

  return (
    <Dialog open={!!editingAsset} onClose={onClose} className="bg-gray-100">
      <div className="modal-box h-96 mx-auto">
        <form method="dialog" onSubmit={(e) => e.preventDefault()}>
          <button
            className="btn btn-sm text-red-500 text-2xl font-bold btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Edit Asset</h3>
        <div className="py-4 flex flex-col">
          <div>
            <label className="font-bold" htmlFor="assetName">Asset Name:</label>
            <input
              type="text"
              id="assetName"
              name="name"
              className="input input-bordered w-full"
              value={updatedAsset.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="font-bold" htmlFor="assetType">Asset Type:</label>
            <select
              id="assetType"
              name="type"
              className="input input-bordered w-full"
              value={updatedAsset.type}
              onChange={handleChange}
            >
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
          </div>

          <div>
            <label className="font-bold" htmlFor="assetQuantity">Asset Quantity:</label>
            <input
              type="number"
              id="assetQuantity"
              name="quantity"
              className="input input-bordered w-full"
              value={updatedAsset.quantity}
              onChange={handleChange}
            />
          </div>
          <button onClick={handleUpdate} className="btn btn-outline my-3">Update Asset</button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditAssetModal;