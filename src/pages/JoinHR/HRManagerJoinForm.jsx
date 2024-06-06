import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const HRManagerJoinForm = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const { email, password, displayName, dateOfBirth, photoURL, role, companyName, companyLogo, selectedPackage } = data;

      // Create user in Firebase authentication
      const userCredential = await createUser(email, password);
      const user = userCredential.user;
      console.log(user);

      // Update user profile
      await updateUserProfile(displayName, photoURL);

      // Construct userInfo object for API call
      const userInfo = {
        displayName,
        email,
        password,
        dateOfBirth,
        photoURL,
        role,
        companyName,
        companyLogo: companyLogo[0], 
        selectedPackage,
      };

      // Make API call to register HR Manager
      const response = await axiosPublic.post('/hr-register', userInfo);

      // If registration successful, show success message and reset form
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "HR Manager registered successfully",
          timer: 2000,
          showConfirmButton: false,
        });
        reset(); // Reset form
        navigate('/');
      }
    } catch (error) {
      // Handle registration errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to register HR Manager",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Asset Guard | Join as HR Manager</title>
      </Helmet>
      <div className="">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Join as an HR Manager</h1>
          </div>
          <div className="lg:w-2/3 md:w-full shadow-md border rounded-xl bg-white">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="grid lg:grid-cols-2 gap-2">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Full Name</span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    placeholder="Full Name"
                    className="input input-bordered"
                    {...register("displayName", { required: true })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Name</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    className="input input-bordered"
                    {...register("companyName", { required: true })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Company Logo</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="companyLogo"
                    className="input input-bordered"
                    {...register("companyLogo", { required: true })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered"
                    {...register("email", { required: true })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered"
                    {...register("password", { required: true })}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Date of Birth</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    className="input input-bordered"
                    {...register("dateOfBirth", { required: true })}
                    required
                  />
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  name="photoURL"
                  placeholder="Photo URL"
                  className="input input-bordered"
                  {...register("photoURL")}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Select a package</span>
                </label>
                <select
                  name="selectedPackage"
                  className="select select-bordered"
                  {...register("selectedPackage", { required: true })}
                  required
                >
                  <option value="">Select Package</option>
                  <option value="basic">5 Members for $5</option>
                  <option value="standard">10 Members for $8</option>
                  <option value="premium">20 Members for $15</option>
                </select>
              </div>
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text font-semibold">
                    Role: HR Manager
                  </span>
                  <input
                    type="checkbox"
                    name="role"
                    className="checkbox"
                    value="hr"
                    {...register("role")}
                  />
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Signup"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default HRManagerJoinForm;
