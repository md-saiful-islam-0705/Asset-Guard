import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const EmployeeJoinForm = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const { email, password, fullName, dateOfBirth, photoURL, role } = data;

            const userCredential = await createUser(email, password);
            const user = userCredential.user;
            console.log(user)

            await updateUserProfile(fullName, photoURL);

            const userInfo = {
                fullName,
                email,
                dateOfBirth,
                photoURL,
                role
            };

            const response = await axiosPublic.post('/register', userInfo);

            if (response.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Employee registered successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                reset();
                navigate('/');
            } else {
                throw new Error('Failed to register employee');
            }
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Swal.fire({
                    title: 'Error!',
                    text: 'The email address is already in use by another account.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to register employee',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }

            console.error('Failed to register employee:', error);
        }
    };

    return (
        <>
            <Helmet>
                <title>Asset Guard | Join as Employee</title>
            </Helmet>
            <div className="">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Join as an Employee</h1>
                    </div>
                    <div className="lg:w-2/3 md:w-full w-full shadow-md border rounded-xl bg-white">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="grid grid-cols-1 gap-2">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Full Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        {...register('fullName', { required: true })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.fullName && <span className="text-red-600">Full Name is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Photo URL"
                                        {...register('photoURL', { required: true })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        {...register('email', { required: true })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.email && <span className="text-red-600">Email is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        {...register('password', { required: true, minLength: 6 })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.password && <span className="text-red-600">Password is required (min 6 characters)</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date of Birth</span>
                                    </label>
                                    <input
                                        type="date"
                                        {...register('dateOfBirth', { required: true })}
                                        className="input input-bordered"
                                        required
                                    />
                                    {errors.dateOfBirth && <span className="text-red-600">Date of Birth is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Role</span>
                                    </label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            {...register('role', { required: true })}
                                            className="checkbox checkbox-sm checkbox-primary "
                                            value="employee"
                                        />
                                        <span>Employee</span>
                                    </div>
                                    {errors.role && <span className="text-red-600">Role is required</span>}
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="Signup"
                                />
                            </div>
                        </form>
                        <p className="px-6"><small>Already have an account? <Link to="/login">Login</Link></small></p>
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EmployeeJoinForm;
