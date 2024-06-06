// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";

// const useEmployee = () => {
//     const { user, loading } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: employeeData, isLoading: isEmployeeLoading } = useQuery({
//         queryKey: [user?.email, 'employeeData'],
//         enabled: !loading && !!user?.email,
//         queryFn: async () => {
//             console.log('Fetching employee data', user);
//             const res = await axiosSecure.get(`/users/employee/${user.email}`);
//             return res.data;
//         }
//     });

//     return { employeeData, isEmployeeLoading };
// };

// export default useEmployee;
