import React from "react";

import { useSelector } from "react-redux";

import { SideMenu } from "./components/containers/SideMenu/SideMenu";
import { AppRoutes } from "./components/containers/AppRoutes/AppRoutes.js";
import SidePanelTemplate from "./components/containers/SidePanel/SidePanelTemplate";

import "./App.scss";

const App = () => {
  const { isOpen, panelType } = useSelector((state) => state.SidePanelReducer);

  return (
    <div className="basic-layout">
      <div className="basic_layout__sidemenu">
        <SideMenu />
      </div>
      <div
        className="basic_layout__content"
        style={{
          width: "100%",
          paddingLeft: `${280}px`,
          paddingRight: !!isOpen ? `${400}px` : 0,
        }}
      >
        <AppRoutes />
      </div>
      <SidePanelTemplate isActive={isOpen} panelType={panelType} />
    </div>
  );
};
export default App;
