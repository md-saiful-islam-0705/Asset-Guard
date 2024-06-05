import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        role: "employee",
        socialProvider: "Google",
      };
      axiosPublic.post("/register", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  return (
    <div className="px-8 pb-8">
        <button onClick={handleGoogleSignIn} className="btn w-full">
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
    </div>
  );
};

export default SocialLogin;
