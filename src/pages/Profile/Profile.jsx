import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [fullName, setFullName] = useState(user?.displayName || ""); 

    const handleFullNameChange = (event) => {
        const value = event.target.value;
        setFullName(value);
    };
    console.log(user)

    const handleUpdateProfile = () => {
        updateUserProfile(fullName, user.photoURL)
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Updated',
                    text: 'Your profile has been updated successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'An error occurred while updating your profile. Please try again later.',
                });
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold text-center mt-6 mb-3">Profile</h1>
            <div className="flex lg:w-2/3 mx-auto justify-center flex-col border-indigo-100 border-2 shadow rounded-xl p-5 gap-4">
            <div className="">
                <div>
                    <label className="block mb-2 font-semibold">Full Name:</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={handleFullNameChange}
                        className="input input-bordered w-full"
                    />
                </div>
                <div>
                    <label className="block mb-2 font-semibold">Email:</label>
                    <input
                        type="email"
                        value={user?.email}
                        disabled
                        className="input input-bordered w-full"
                    />
                </div>
            </div>
            <button onClick={handleUpdateProfile} className="btn btn-outline">Update Profile</button>
            </div>
        </div>
    );
};

export default Profile;
