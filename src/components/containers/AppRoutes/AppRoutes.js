import React from "react";
import {  Route, Routes } from "react-router-dom";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import Companies from "../../../pages/Companies/Companies";
import Drivers from "../../../pages/Driver/Drivers";

const AppRoutes = () => {
  return (
      <Routes>
        <Route index path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/auth/login" element={<Login />} /> */}
        <Route path="/companies" element={<Companies />} />
        <Route path="/drivers" element={<Drivers />} />
      </Routes>
  );
};
export default AppRoutes;
