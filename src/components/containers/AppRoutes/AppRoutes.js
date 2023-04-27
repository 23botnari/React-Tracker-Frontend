import React from "react";
import {  Route, Routes } from "react-router-dom";
import Login from "../../containers/Login/Login";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import Companies from "../../../pages/Companies/Companies";
import Phones from "../../../pages/Phones/Phones";

const AppRoutes = () => {
  return (
      <Routes>
        <Route index path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/auth/login" element={<Login />} /> */}
        <Route path="/companies" element={<Companies />} />
        <Route path="/phones" element={<Phones />} />
      </Routes>
  );
};
export default AppRoutes;
