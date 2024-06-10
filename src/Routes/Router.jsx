import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Profile from "../pages/Profile/Profile";
import JoinEmployee from "../pages/JoinEmployee/JoinEmployee";
import JoinHRManager from "../pages/JoinHR/JoinHRManager";
import EmployeeHome from "../pages/DashBoard/Employee/EmployeeHome";
import Dashboard from "../Layout/DashBoard";
import PrivateRoute from "../Routes/PrivateRoute";
import AddEmployee from "../pages/DashBoard/HRManager/AddEmployee/AddEmployee";
import AddAseet from "../pages/DashBoard/HRManager/AddAseet";
import MyEmployeeList from "../pages/DashBoard/HRManager/MyEmployeeList";
import AssetList from "../pages/DashBoard/HRManager/AssetList";
import RequestAsset from "../pages/DashBoard/Employee/AssetRequest";
import MyAsset from "../pages/DashBoard/Employee/MyAsset";
import AllRequests from "../pages/DashBoard/HRManager/AllRequests";
import MyTeam from "../pages/DashBoard/Employee/MyTeam";
import HRHome from "../pages/DashBoard/HRManager/HRHome";
import AvailablePackage from "../pages/DashBoard/HRManager/AddEmployee/AvailablePackage";
import Payment from "../pages/DashBoard/HRManager/AddEmployee/Payment/Payment";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HRRoute from "./HRRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "join-employee",
        element: <JoinEmployee></JoinEmployee>,
      },
      {
        path: "join-hr",
        element: <JoinHRManager></JoinHRManager>,
      },

      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      // HR Manager
      {
        path: "hr-home",
        element: <HRRoute><HRHome></HRHome></HRRoute>,
      },
      {
        path: "add-employee",
        element: <HRRoute><AddEmployee></AddEmployee></HRRoute>,
      },
      {
        path: "add-asset",
        element: <HRRoute><AddAseet></AddAseet></HRRoute>,
      },
      {
        path: "employee-list",
        element: <HRRoute><MyEmployeeList></MyEmployeeList></HRRoute>,
      },
      {
        path: "asset-list",
        element: <HRRoute><AssetList></AssetList></HRRoute>,
      },
      {
        path: "hr-profile",
        element: <HRRoute><Profile></Profile></HRRoute>,
      },
      {
        path: "all-requests",
        element: <HRRoute><AllRequests></AllRequests></HRRoute>,
      },
      {
        path: "available-package",
        element: <HRRoute><AvailablePackage></AvailablePackage></HRRoute>,
      },
      {
        path: "payment",
        element: <HRRoute><Payment></Payment></HRRoute>,
      },

      // Employee
      {
        path: "employee-home",
        element: (
          <PrivateRoute>
            <EmployeeHome></EmployeeHome>
          </PrivateRoute>
        ),
      },
      {
        path: "request-asset",
        element: <RequestAsset></RequestAsset>,
      },
      {
        path: "my-assets",
        element: <MyAsset></MyAsset>,
      },
      {
        path: "employee-profile",
        element: <Profile></Profile>,
      },

      {
        path: "my-team",
        element: <MyTeam></MyTeam>,
      },
    ],
  },
]);
