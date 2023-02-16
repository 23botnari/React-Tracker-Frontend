import "./App.scss";
import { SideMenu } from "./components/containers/SideMenu/SideMenu";
import { AppRoutes } from "./components/containers/AppRoutes/AppRoutes.js";
import React from "react";


function App() {
  return (
    <div className="basic-layout">
      <div className="basic_layout__sidemenu">
        <SideMenu></SideMenu>
      </div>
      <div
        className="basic_layout__content"
        style={{
          width: "100%",
          paddingLeft: (SideMenu?.offsetwidth ?? 0) + 280,
          paddingRight:"calc(100%-200px)",
          position:"absolute",
        }}
      >
        <AppRoutes></AppRoutes>
      </div>
      <div className="basic_layout__sidepanel">
      </div>
    </div>
  );
}
export default App;
