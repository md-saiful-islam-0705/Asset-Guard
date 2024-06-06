import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import defaultCompanyLogo from "../../assets/logo/logo-01.avif";
import {
  FaHome,
  FaBox,
  FaPlus,
  FaList,
  FaUsers,
  FaUserCircle,
  FaSignOutAlt,
  FaArrowRight,
  FaBars,
} from "react-icons/fa";

const HRDashboard = ({ user, logOut, hrData }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const companyLogoUrl = hrData.companyLogo || defaultCompanyLogo;
  const companyName = hrData.companyName;

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
        <div className="flex flex-col items-center justify-between">
          <img
            src={companyLogoUrl}
            alt="Company Logo"
            className="w-full h-16 mb-5 object-contain"
          />
          <p className="text-center mb-4 text-xl font-semibold">
            {companyName}
          </p>
        </div>
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard/hr-home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/asset-list"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaBox className="mr-2" /> Asset List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-asset"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaPlus className="mr-2" /> Add an Asset
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/all-requests"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaList className="mr-2" /> All Requests
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/employee-list"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaUsers className="mr-2" /> Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/add-employee"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center py-2 border-2 border-blue-500 rounded px-2 text-blue-500"
                  : "flex items-center py-2"
              }
              onClick={closeMenu}
            >
              <FaUserCircle className="mr-2" /> Add an Employee
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
              <FaUserCircle className="mr-2" /> Profile
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
          <p className="mt-2 font-bold">{user.displayName}</p>
          <img
            src={user.photoURL}
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
            src={companyLogoUrl}
            alt="Company Logo"
            className="w-8 h-8 object-contain rounded-full"
          />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default HRDashboard;
