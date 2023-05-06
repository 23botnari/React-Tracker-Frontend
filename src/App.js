import React, { useState } from "react";

import { useSelector } from "react-redux";

import SideMenu from "./components/containers/SideMenu/SideMenu";
import AppRoutes from "./components/containers/AppRoutes/AppRoutes.js";
import SidePanelTemplate from "./components/containers/SidePanel/SidePanelTemplate";

import "./App.scss";
import Login from "./components/containers/Login/Login";
import useToken from "./components/containers/Login/useToken";

const App = () => {
  const { isOpen, panelType, panelTitle } = useSelector(
    (state) => state.SidePanelReducer
  );
  const { isExpanded } = useSelector((state) => state.SideMenuReducer);
  const { token, setToken } = useToken();
  if (!token) {
    return <Login setToken={setToken} />;
  }
  
  return (
    <div className="basic-layout">
      <div className="basic_layout__sidemenu">
        <SideMenu />
      </div>
      <div
        className="basic_layout__content"
        style={{
          width: "100%",
          paddingLeft: !!isExpanded ? `${250}px` : `${90}px`,
          paddingRight: !!isOpen ? `${350}px` : `${0}px`,
        }}
      >
        <AppRoutes />
      </div>
      <SidePanelTemplate
        isActive={isOpen}
        panelType={panelType}
        panelTitle={panelTitle}
      />
    </div>
  );
};
export default App;
