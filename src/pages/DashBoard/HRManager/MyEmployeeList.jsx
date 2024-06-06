import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { RiDeleteBin5Fill } from "react-icons/ri";

const MyEmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: members, isLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/team/members");
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (memberId) => axiosSecure.delete(`/team/members/${memberId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["teamMembers"]);
    },
  });

  if (isLoading) {
    return <div>Loading team members...</div>;
  }

  return (
    <div className="">
      <p className="text-center font-bold text-gray-500 my-8 text-2xl">
        My Employee List
      </p>
      <table className="table shadow  ">
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
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={member.photoURL}
                        alt={`${member.fullName}'s profile`}
                      />
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div className="font-bold">{member.fullName}</div>
              </td>

              <td
                className={`font-bold  ${
                  member.role === "hr" ? "text-blue-300" : "text-black"
                }`}
              >
                {member.role === "hr" ? "HR" : "Employee"}
              </td>

              <th>
                <button
                  className="text-red-500 text-xl btn btn-md btn-outline"
                  onClick={() => mutation.mutate(member._id)}
                >
                  <RiDeleteBin5Fill />
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyEmployeeList;
