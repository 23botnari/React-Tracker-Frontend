import Login from "../../Login";
import Dashboard from "../../Dashboard/Dashboard";
import Companies from "../../Companies/Companies";
import Phones from "../../Phones/Phones";
import { BrowserRouter, Route, Routes } from "react-router-dom";
export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/auth/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/phones" element={<Phones />} />
      </Routes>
    </BrowserRouter>
  );
};
