import { useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";

const AssetRequestModal = ({ selectedAsset }) => {
  const [additionalNotes, setAdditionalNotes] = useState("");
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const handleRequestAsset = async () => {
    if (!selectedAsset) {
      Swal.fire({
        icon: "warning",
        title: "No asset selected",
        text: "Please select an asset to request.",
      });
      return;
    }

    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "User not authenticated",
        text: "Please log in to request an asset.",
      });
      return;
    }

    const requestData = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.name,
      assetType: selectedAsset.type,
      additionalNotes,
      user: {
        userEmail: user.email,
        userName: user.displayName,
      },
    };

    try {
      const res = await axiosSecure.post("/asset-requests", requestData);
      if (res.data.assetRequest) {
        document.getElementById("asset_request_modal").close();
        setAdditionalNotes("");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Asset request submitted successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Failed to submit asset request");
      }
    } catch (error) {
      console.error("Error submitting asset request:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while submitting the asset request",
      });
    }
  };
  

  return (
    <dialog id="asset_request_modal" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" type="button" onClick={() => document.getElementById("asset_request_modal").close()}>✕</button>
        </form>
        {selectedAsset ? (
          <>
            <h3 className="font-bold text-lg my-2 text-center">Request Asset</h3>
            <div className="flex justify-between items-center">
            <div className="flex items-center justify-start ">
              <p className="py-2 font-semibold text-gray-700"></p>
              <span className="py-2 font-semibold text-gray-500">{selectedAsset.name} <span className="text-blue-500">({selectedAsset.quantity} pcs)</span> </span>
            </div>
            <div className="flex items-center justify-start ">
              <p className="py-2 font-semibold text-gray-700"></p>
              <span className="font-semibold text-blue-500">{selectedAsset.type}</span>
            </div>
            </div>
            <textarea
              className="textarea w-full mb-4 border border-blue-100"
              placeholder="Additional Notes..."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
            ></textarea>
            <button className="btn btn-primary w-full" onClick={handleRequestAsset}>
              Request
            </button>
          </>
        ) : (
          <p className="text-center">No asset selected.</p>
        )}
      </div>
    </dialog>
  );
};

export default AssetRequestModal;
