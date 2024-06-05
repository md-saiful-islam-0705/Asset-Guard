import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useHR = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: hrData, isLoading: isHRLoading } = useQuery({
        queryKey: [user?.email, 'isHR'],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            console.log('Checking if user is HR', user);
            const res = await axiosSecure.get(`/users/hr/${user.email}`);
            return res.data?.hr;
        }
    });

    const isHR = !!hrData;

    return { isHR, hrData, isHRLoading };
};

export default useHR;
