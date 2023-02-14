import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";

import { Provider } from "react-redux";
import { store } from "./features/store";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contact" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
