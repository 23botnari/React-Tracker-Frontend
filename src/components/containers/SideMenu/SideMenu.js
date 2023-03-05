import React, { useState } from "react";

import "./SideMenu.scss";
import Logo from "../../../assets/logo192.png";
import { SideMenuData } from "./SideMenuData";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { setIsExpanded } from "../../../redux/actions/sideMenuActions";

const SideMenu = ({ toggleExpanded }) => {
  const dispatch = useDispatch();
const [show, setshow] = useState(true);
  return (
    <>
      <div className={`SideMenu ${!!toggleExpanded ? "expanded" : ""}`}>
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
                {!!toggleExpanded ? <span id="label">{val.label}</span> : ""}
              </li>
            );
          })}
        </ul>
        <div
          className="SideMenu__button"
          onClick={() => {
            dispatch(setIsExpanded(!toggleExpanded));
          }}
        >
          <i
            className={`pi pi-chevron-${!!toggleExpanded ? "left" : "right"}`}
          ></i>
        </div>
      </div>
    </>
  );
};
export default SideMenu;
