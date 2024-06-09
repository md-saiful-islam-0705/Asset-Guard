import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { RiMessage3Fill } from "react-icons/ri";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: members,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/team/members");
      return res.data;
    },
  });

  const handleDeleteMember = async (member) => {
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
          const res = await axiosSecure.delete(`/team/members/${member._id}`);
          if (res.data.deletedCount > 0) {
            // Refetch to update the UI
            await refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${member.displayName} has been deleted`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while deleting the member",
          });
        }
      }
    });
  };

  if (isLoading) {
    return <div>Loading team members...</div>;
  }

  return (
    <div className="">
      <p className="text-center font-bold text-gray-500 my-6 text-2xl">
        My Employee List
      </p>

      <div className="">
        <table className="table shadow ">
          <p className="px-4 py-2 absolute -top-4 -right-3 rounded-badge text-xl  font-bold bg-gray-300 ">
            {members.length}
          </p>
          <thead>
            <tr className="bg-gray-100">
              <th>Profile</th>
              <th>Name</th>
              <th>Job Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td>
                  <div className="flex members-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={member.photoURL}
                          alt={`${member.displayName}'s profile`}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">{member.displayName}</div>
                </td>
                <td
                  className={`font-bold ${
                    member.role === "hr" ? "text-blue-300" : "text-purple-200"
                  }`}
                >
                  {member.role === "hr" ? "HR" : "Employee"}
                </td>
                <td>
                  {member.role === "hr" ? (
                    <button className="btn btn-ghost">
                      <RiMessage3Fill className=" text-2xl text-blue-200" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleDeleteMember(member)}
                      className="btn btn-ghost"
                    >
                      <FaTrashAlt className="text-red-600 text-2xl" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyEmployeeList;
