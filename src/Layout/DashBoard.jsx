import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useHR from "../hooks/useHR";
import HRDashboard from "../pages/DashBoard/HRDashBoard";
import EmployeeDashboard from "../pages/DashBoard/EmployeeDashBoard";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const { isHR, hrData, isHRLoading } = useHR();

  if (isHRLoading) {
    return (
      <div>
        <span className="loading loading-ball loading-xs"></span>
        <span className="loading loading-ball loading-sm"></span>
        <span className="loading loading-ball loading-md"></span>
        <span className="loading loading-ball loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="h-full ">
      {isHR ? (
        <HRDashboard user={user} logOut={logOut} hrData={hrData} />
      ) : (
        <EmployeeDashboard  user={user} logOut={logOut} />
      )}
    </div>
  );
};

export default Dashboard;
