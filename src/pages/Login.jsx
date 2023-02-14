import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";

function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const { currentUser } = auth;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };
  // const loginwithgoogle = () => {
  //   setLoading(true);
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // The signed-in user info.
  //       const user = result.user;

  //       setDoc(doc(db, "users", user.displayName), {
  //         id: user.uid,
  //         username: user.displayName,
  //       }).then(() => {

  //         setLoading(false);
  //         navigate("/");
  //       });
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       alert(error);
  //       // ...
  //     });

  // };
  currentUser?.displayName !== undefined &&
    dispatch(setUser(currentUser?.displayName));
  console.log(auth);
  //Loader
  if (loading) {
    return "Loading";
  } else {
    return (
      <div className="signin__container">
        <h1>Sign In</h1>
        <form onSubmit={handlesubmit}>
          <input
            value={email}
            required
            type="email"
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
          />
          <input
            value={password}
            required
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign In</button>
        </form>
        {/* <h3 className="signin__google" onClick={loginwithgoogle}
          >
            Login with&nbsp;
            <img src="/logo.svg" alt="google-logo" />
          </h3> */}
        <h3>
          New to Netflix? <Link to="/contact">Sign up now.</Link>
        </h3>
      </div>
    );
  }
}

export default Login;
