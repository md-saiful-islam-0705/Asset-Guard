import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import useHR from '../hooks/useHR';
import HRDashboard from '../pages/DashBoard/HRDashBoard';
import EmployeeDashboard from '../pages/DashBoard/EmployeeDashBoard';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const { isHR, hrData, isHRLoading } = useHR();

    if (isHRLoading) {
        return <div>Loading...</div>; // Optional: Add a loading indicator
    }

    return (
        <div>
            {isHR ? (
                <HRDashboard user={user} logOut={logOut} hrData={hrData} />
            ) : (
                <EmployeeDashboard user={user} logOut={logOut} />
            )}
        </div>
    );
};

export default Dashboard;
