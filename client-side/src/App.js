import "./styles/App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { checkLogin } from "./features/users/usersSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const userToken = localStorage.getItem("user_token");
  const userGlobal = useSelector((state) => state.users.user);

  useEffect(() => {
    if (userToken) {
      dispatch(checkLogin(userToken));
      // alert(userToken)
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        {userGlobal.id === "" ? (
          //when no users have logged in
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        ) : (
          //when a users have logged in
          <>
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<Users />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
