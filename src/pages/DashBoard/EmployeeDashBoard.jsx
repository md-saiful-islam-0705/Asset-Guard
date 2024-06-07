import { useContext, useState } from "react";
import {  NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import defaultCompanyLogo from "../../assets/logo/logo-01.avif";
import {
  FaArrowRight,
  FaOpencart,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { RiTeamFill } from "react-icons/ri";
import { FaFileCircleQuestion } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

const EmployeeDashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative flex h-screen">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={closeMenu}
        ></div>
      )}
      <aside
        className={`h-full bg-white border-r shadow-lg w-64 p-5 flex flex-col transform ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:static z-20`}
      >
        <img
          src={defaultCompanyLogo}
          alt="Company Logo"
          className="w-full h-16 mb-5 object-contain"
        />
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/employee-home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <IoMdHome className="mr-2" />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-assets"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaOpencart className="mr-2" />
              <span>My Assets</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/my-team"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <RiTeamFill className="mr-2" />
              <span>My Team</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/request-asset"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaFileCircleQuestion className="mr-2" />
              <span>Request for an Asset</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <CgProfile className="mr-2" />
              <span>Profile</span>
            </NavLink>
          </li>
        </ul>
        <div className="divider"></div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center py-2 space-x-2 text-yellow-500"
              : "flex items-center py-2 space-x-2"
          }
          onClick={closeMenu}
        >
          <span className="font-semibold hover:text-blue-500">
            Back to Home
          </span>
          <FaArrowRight />
        </NavLink>
        <div className="mt-auto flex flex-col items-center">
          <p className="mt-2 font-bold">{user?.displayName}</p>
          <img
            src={user?.photoURL}
            alt="Profile"
            className="w-16 h-16 rounded-full mt-2"
          />
          <div className="flex mt-5 items-center justify-between gap-2 underline text-red-500">
            <button className="" onClick={logOut}>
              Logout
            </button>
            <FaSignOutAlt className="mr-2" />
          </div>
        </div>
      </aside>
      <main className="flex-1 p-5">
        <div className="md:hidden flex justify-between items-center p-4 border bg-white shadow">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
          <img
            src=""
            alt="Company Logo"
            className="w-8 h-8 object-contain rounded-full"
          />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
