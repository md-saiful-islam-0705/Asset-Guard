import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";
import { FooterWithSocialLinks } from "../pages/Shared/Footer/Footer";

const Main = () => {
    return (
        <div className=" max-w-full mx-auto">
            <Navbar></Navbar>
            <Outlet></Outlet>
            <FooterWithSocialLinks/>
        </div>
    );
};

export default Main;