import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/Register";
import Users from "../pages/Users";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AppRoutes;
