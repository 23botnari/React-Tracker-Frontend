import "./App.scss";
import { useState } from "react";
import { SideMenu } from "./components/containers/SideMenu/SideMenu";
import { AppRoutes } from "./components/containers/AppRoutes/AppRoutes.js";
import React from "react";
import SidePanelTemplate from "./components/containers/SidePanel/SidePanelTemplate";
import { AppPanel } from "./components/containers/SidePanel/AppPanel";
import { AppContext } from "./lib/contextLib";
import { Routes } from "react-router-dom";
import { Button } from "primereact/button";
import AppLogin from "./components/Login";
function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      {isAuthenticated ? (
        <>
          <div className="basic-layout">
            <div className="basic_layout__sidemenu">
              <SideMenu></SideMenu>
            </div>
            <div
              className="basic_layout__content"
              style={{
                width: "100%",
                paddingLeft: (SideMenu?.offsetwidth ?? 0) + 280,
                paddingRight: "calc(100%-300px)",
              }}
            >
              <AppRoutes></AppRoutes>
            </div>
            {/* <div className="basic_layout__sidepanel" >
        <SidePanelTemplate ></SidePanelTemplate>
      </div>  */}
          </div>
        </>
      ) : (
        <>
          <AppLogin />
        </>
      )}{" "}
    </AppContext.Provider>
  );
}
export default App;
