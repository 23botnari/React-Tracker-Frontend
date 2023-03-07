import Login from "../../Login";
import Dashboard from "../../../pages/Dashboard/Dashboard";
import Companies from "../../../pages/Companies/Companies";
import Phones from "../../../pages/Phones/Phones";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Dashboard />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/phones" element={<Phones />} />
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
