import { useContext } from "react";
import { IoMdHome } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { FaArrowRight, FaOpencart } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const EmployeeDashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="flex h-screen">
      <aside className="bg-gray-100 text-black w-64 p-5 flex flex-col">
        <img
          src=""
          alt="Company Logo"
          className="w-full h-16 mb-5 object-contain"
        />
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard/employee-home"
              className="flex items-center py-2 space-x-2"
            >
              <IoMdHome className="text-xl" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/my-assets" className="flex items-center py-2 space-x-2">
              <FaOpencart className="text-xl"/>
              <span>My Assets</span>
            </Link>
          </li>
          <li>
            <Link to="/my-team" className="flex items-center py-2 space-x-2">
            <RiTeamFill className="text-xl"/>
              <span>My Team</span>
            </Link>
          </li>
          <li>
            <Link to="/request-asset" className="flex items-center py-2 space-x-2">
            <FaFileCircleQuestion className="text-xl"/>
              <span>Request for an Asset</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="flex items-center py-2 space-x-2">
            <CgProfile />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
        <div className="divider"></div>
        <Link to="/" className="flex items-center py-2 space-x-2">
          <span>Back to Home</span>
          <FaArrowRight />
        </Link>
        <div className="mt-auto flex flex-col items-center">
          <p className="mt-2 font-bold">{user?.displayName}</p>
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full mt-2"
          />
          <button className="mt-5 text-red-500" onClick={logOut}>
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-5">
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
