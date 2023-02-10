import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Companies from "./components/Companies/Companies";
import Phones from "./components/Phones/Phones";
import Sidebar from "./components/containers/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div className="basic-layout">
        <div className="basic_layout__sidebar">
          <Sidebar />
        </div>
        <div className="basic_layout__content" style={{width:"100%", padding: "30px" }}>
          <Routes>
            <Route index path="/auth/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/phones" element={<Phones />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
