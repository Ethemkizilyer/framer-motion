import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth, signIn, signInWithGoogle, userObserver } from "../auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../features/authSlice";
import { useDispatch } from "react-redux";

const Login = () => {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [isRegistring, setIsRegistring] = useState(false);
      const [registerInformation, setRegisterInformation] = useState({
        email: "",
        confirmEmail: "",
        password: "",
        confirmPassword: "",
      });
      const navigate = useNavigate();

      useEffect(() => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            navigate("/homepage");
          }
        });
      }, []);

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };
      const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            navigate("/homepage");
          })
          .catch((err) => alert(err.message));
      };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const user = await signInWithEmailAndPassword(
       auth,
       email,
       password
     );
     navigate("/");
  
     alert(`Hoş geldiniz Sn. ${auth?.currentUser?.displayName}`);
   } catch (err) {
     alert(err.message);
   }
 };

  const signInWithGoo = () => {
    navigate("/");
    return signInWithGoogle();
  };

  return (
    <div className="h-full mt-[5%] flex flex-col justify-center">
      <div className="bg-[#F9F9F9] p-[20px] min-w-[23rem] mx-auto  rounded-[15px] shadow-md ">
        <h3 className="text-[30px] text-center font-[500] text-[#064663]">
          Join Today 🚀
        </h3>
        <div className="join__desc">
          <h3 className="text-[18px] font-[400]">
            Sign in with one of the providers
          </h3>
          <button
            className="h-[45px] w-full border-none rounded-[6px] bg-[#323636] text-[#EEF1FF] transition-all duration-400 ease-in-out cursor-pointer gap-[10px] flex items-center justify-center hover:bg-[#1B2430] text-[13px]"
            onClick={signInWithGoo}
          >
            <FcGoogle className="text-[25px]" />
            Sign in with Google
          </button>
        </div>

        <div >
          <h1>Todo list</h1>
          <div>
            {isRegistring ? (
              <>
                <div class="row">
                  <div class="input-field col s6">
                    <input
                      type="email"
                      placeholder="email"
                      value={registerInformation.email}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          email: e.target.value,
                        })
                      }
                    />
                    <input
                      type="email"
                      placeholder="Confirm email"
                      value={registerInformation.confirmEmail}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          confirmEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div class="input-field col s6">
                    <input
                      type="password"
                      placeholder="password"
                      value={registerInformation.password}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          password: e.target.value,
                        })
                      }
                    />
                    <input
                      type="password"
                      placeholder="Confirm password"
                      value={registerInformation.confirmPassword}
                      onChange={(e) =>
                        setRegisterInformation({
                          ...registerInformation,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div>
                  <div
                    className="waves-effect waves-light btn"
                    onClick={handleSubmit}
                  >
                    Register
                  </div>
                  <div
                    className="waves-effect waves-light btn"
                    onClick={() => setIsRegistring(false)}
                  >
                    Go back
                  </div>
                </div>
              </>
            ) : (
              <>
                <div class="row">
                  <input
                    className="validate"
                    type="email"
                    onChange={handleEmailChange}
                    value={email}
                    placeholder="email"
                  />

                  <input
                    className="validate"
                    type="password"
                    onChange={handlePasswordChange}
                    value={password}
                    placeholder="password"
                  />
                </div>
                <div >
                  <div
                    className="waves-effect waves-light btn"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </div>
                  <div
                    className="waves-effect waves-light btn"
                    onClick={() => setIsRegistring(true)}
                  >
                    Create an account
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
