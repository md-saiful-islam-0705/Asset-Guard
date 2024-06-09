import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAsset = () => {
  const { register, handleSubmit, reset } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      const currentDate = new Date().toISOString();
      const assetData = {
        name: data.name,
        type: data.type,
        quantity: parseInt(data.quantity),
        image: res.data.data.display_url,
        createdAt: currentDate,
      };

      const assetRes = await axiosSecure.post("/assets", assetData);

      if (assetRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${data.name} is added as an asset.`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
      navigate('/dashboard/asset-list')
    }
  };

  return (
    <div className="container mx-auto p-8 border-2 border-gray-400 rounded-xl my-10">
      <p className="font-bold text-center  text-gray-600 text-2xl">Add Asset</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text font-semibold">
              Product Name <span className="text-red-500">*</span>{" "}
            </span>
          </label>
          <input
            type="text"
            placeholder="Product Name"
            {...register("name", { required: true })}
            required
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control w-full my-6">
          <label className="label">
            <span className="label-text font-semibold">
              Product Type <span className="text-red-500">*</span>{" "}
            </span>
          </label>
          <select
            {...register("type", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Product Type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-Returnable">Non-Returnable</option>
          </select>
        </div>

        <div className="lg:flex justify-between items-center gap-2">
          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text font-semibold">
                Product Quantity <span className="text-red-500">*</span>{" "}
              </span>
            </label>
            <input
              type="number"
              placeholder="Product Quantity"
              {...register("quantity", { required: true })}
              required
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full mb-2">
            <label className="label">
              <span className="label-text font-semibold">
                Product Image <span className="text-red-500">*</span>{" "}
              </span>
            </label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full"
            />
          </div>
        </div>

        <button type="submit" className="btn w-full my-4 btn-outline">
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
