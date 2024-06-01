import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="carousel w-full lg:rounded-lg">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/ysPm3sX/banner-1.jpg "
          className="w-full"
          alt="Banner 1"
        />
        <div className="absolute flex flex-col items-center justify-center transform -translate-y-1/2 left-5 right-5 top-1/2">
          <div className="flex justify-between w-full">
            <a href="#slide2" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <Link to="/join-hr" className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white btn btn-outline border-white ">
          Join as HR Manager <FaArrowAltCircleRight className="ml-2" />
        </Link>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://i.ibb.co/C98Rb1q/banner-2.jpg"
          className="w-full"
          alt="Banner 2"
        />
        <div className="absolute flex flex-col items-center justify-center transform -translate-y-1/2 left-5 right-5 text-indigo-500 top-1/2">
          <div className="flex justify-between w-full">
            <a href="#slide1" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide1" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
        <Link to="/join-employee" className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-white btn btn-outline border-white ">
          Join as Employee <FaArrowAltCircleRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Banner;
