import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { auth } from "../auth";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db from "../auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";


function SignUp() {
  const [loading, setLoading] = useState(false);
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
const dispatch =useDispatch()
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    dispatch(setUser({username}))
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((authUser) => {
        updateProfile(auth.currentUser, { displayName: username })
          .then(() => {
            setDoc(doc(db, "users", username), {
              id: authUser.user.uid,
              username: username,
            });
          })
          .then(() => {
            setLoading(false);
            navigate("/");
          });
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  //Loader
  if (loading) {
    return "Loading";
  } else {
    return (
    
        
        <div className="signup__container">
          <h1>Sign Up</h1>
          <form onSubmit={handlesubmit}>
            <input
              required
              type="text"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              placeholder="Username"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email Id"
            />
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
          </form>
          <Link to="/login">&nbsp;Sign In</Link>
        </div>
 
    );
  }
}

export default SignUp;
