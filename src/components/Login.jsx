import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
const navigate=useNavigate()
  const [user, loading] = useAuthState(auth);
  //Sign in with google
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      console.log("login");
    }
  }, [navigate, user]);

  return (
    <div className="h-full mt-[10%] flex flex-col justify-center">
      <div className="bg-[#F9F9F9] p-[20px] min-w-[23rem] mx-auto h-[16rem] rounded-[15px] shadow-md">
        <h3 className="text-[30px] font-[500] text-[#064663]">Join Today 🚀</h3>
        <div className="join__desc">
          <h3 className="text-[18px] font-[400]">
            Sign in with one of the providers
          </h3>
          <button
            className="h-[45px] w-full border-none rounded-[6px] bg-[#323636] text-[#EEF1FF] transition-all duration-400 ease-in-out cursor-pointer gap-[10px] flex items-center justify-center hover:bg-[#1B2430] text-[13px]"
            onClick={GoogleLogin}
          >
            <FcGoogle className="text-[25px]" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
