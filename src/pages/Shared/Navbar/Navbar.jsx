import { Link } from "react-router-dom";
import logo from "../../../../public/asset-logo.png";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  let navOptions;

  if (user) {
    // Logged-in users
    navOptions = (
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center cursor-pointer"
          onClick={handleDropdownToggle}
        >
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-9 h-9 rounded-full"
          />
          <FaBars className="ml-2" />
        </div>
        {dropdownOpen && (
          <ul className="absolute right-0  mt-2 w-48 bg-white shadow-lg rounded-md z-10">
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100">
              <Link to="/profile">Profile</Link>
            </li>
            <li
              className="px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={handleLogOut}
            >
              LogOut
            </li>
          </ul>
        )}
      </div>
    );
  } else {
    // Non-logged-in users
    navOptions = (
      <>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/join-employee">Join as Employee</Link>
        </li>
        <li>
          <Link to="/join-hr">Join as HR Manager</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  }

  return (
    <div className="navbar bg-base-100 px-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content font-bold mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <Link to="/">
          <img className="btn btn-ghost" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className=" hidden lg:flex justify-end w-full pr-5">
        <ul className="menu menu-horizontal px-1 font-semibold">
          {user ? (
            <div>
              <li className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center cursor-pointer bg-gray-200 rounded-full"
                  onClick={handleDropdownToggle}
                >
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-9 h-9 rounded-full"
                  />
                  <FaBars className="ml-2" />
                </div>
                {dropdownOpen && (
                  <ul className="absolute right-0 p-2 top-12 mt-2 w-48 bg-white border-2  shadow-lg rounded-md z-10">
                    <li className="  ">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="">
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li
                      className=" px-4 py-2 text-red-500 "
                      onClick={handleLogOut}
                    >
                      LogOut
                    </li>
                  </ul>
                )}
              </li>
            </div>
          ) : (
            <div>
              <div className="flex justify-end items-center mx-auto">
               
                <div className="flex items-center justify-center">
                <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/join-employee">Join as Employee</Link>
                  </li>
                  <li>
                    <Link to="/join-hr">Join as HR Manager</Link>
                  </li>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </div>
              </div>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
