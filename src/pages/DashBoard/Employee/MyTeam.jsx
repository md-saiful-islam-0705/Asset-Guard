import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();

  const { data: members, isLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/team/members");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading team members...</div>;
  }

  return (
    <div className="">
      <p className="text-center font-bold text-gray-500 my-6 text-2xl">
        My Teams
      </p>

      <div className="">
        <table className="table shadow ">
          <p className="px-4 py-2 absolute -top-5 -right-3 rounded-badge text-xl  font-bold bg-gray-300 ">
            <span className="text-blue-500">{members.length}</span>
          </p>
          <thead>
            <tr className="bg-gray-100">
              <th>Profile</th>
              <th>Name</th>
              <th>Job Role</th>
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
                    member.role === "hr" ? "text-blue-400" : "text-purple-400"
                  }`}
                >
                  {member.role === "hr" ? "HR Manager" : "Employee"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTeam;
