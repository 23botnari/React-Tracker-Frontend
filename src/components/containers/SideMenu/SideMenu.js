import React from "react";
import "./SideMenu.scss";
import Logo from "../../../assets/logo192.png";
import { SideMenuData } from "./SideMenuData";

export const SideMenu = () => {
  return (
    <div className="SideMenu">
      <div
        className="SideMenu__Brand"
        onClick={() => {
          window.location.pathname = "/";
        }}
      >
        <img alt="Logo" src={Logo} width="55px" />
        <div className="SideMenu__Title">Zepto Tracker</div>
      </div>

      <ul className="SideMenu__List">
        {SideMenuData.map((val, key) => {
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
