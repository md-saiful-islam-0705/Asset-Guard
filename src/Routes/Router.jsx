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

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
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
        <Dashboard></Dashboard>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "employee-home",
        element: <EmployeeHome></EmployeeHome>,
      },
      {
        path: "add-employee",
        element: <AddEmployee></AddEmployee>,
      },
      {
        path: "add-asset",
        element: <AddAseet></AddAseet>,
      },
      {
        path: "employee-list",
        element: <MyEmployeeList></MyEmployeeList>,
      },
      {
        path: "asset-list",
        element: <AssetList></AssetList>,
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
      {
        path: "all-requests",
        element: <AllRequests></AllRequests>,
      },
    ],
  },
]);
