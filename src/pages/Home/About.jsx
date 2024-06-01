import { BsMouseFill } from "react-icons/bs";
import { FaPenNib, FaRegKeyboard } from "react-icons/fa";
import { GiLaptop } from "react-icons/gi";

const About = () => {
  return (
    <div className="py-5 text-center shadow rounded-lg my-5">
      <h2 className="text-2xl font-bold mb-4">About Asset Guard</h2>
      <p className="text-lg text-gray-700 px-5">
        Asset Guard is a comprehensive web application designed to facilitate
        efficient asset management for businesses.
        With Asset Guard, companies can effortlessly monitor and track the usage
        of their assets, ensuring optimal utilization and maintenance.
      </p>
      <div className="flex justify-around text-4xl p-5 ">
        <p className="bg-gray-100 p-6 rounded-xl shadow">
          <GiLaptop />
        </p>
        <p className="bg-gray-100 p-6 rounded-xl shadow">
          <FaRegKeyboard />
        </p>
        <p className="bg-gray-100 p-6 rounded-xl shadow">
          <BsMouseFill />
        </p>
        <p className="bg-gray-100 p-6 rounded-xl shadow">
          <FaPenNib />
        </p>
      </div>
    </div>
  );
};

export default About;
