import React from "react";
import "./Sidebar.scss";
import Logo from "../../../assets/logo192.png";
import { SidebarData } from "./SidebarData";
import { Button } from "primereact/button";

export const Sidebar = () => {
  return (
    <div className="Sidebar">
      <div
        className="Sidebar__Brand"
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        <img alt="Logo" src={Logo} width="55px" />

        <div className="Sidebar__Title">Zepto Tracker</div>
      </div>

      <ul className="Sidebar__List">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <i id="icon" className={val.icon}></i>
              <span id="label">{val.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
