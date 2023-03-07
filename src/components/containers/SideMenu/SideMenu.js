import React from "react";

import "./SideMenu.scss";
import Logo from "../../../assets/logo192.png";
import { SideMenuData } from "./SideMenuData";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../../redux/actions/sidePanelActions";

import { setIsExpanded } from "../../../redux/actions/sideMenuActions";

const SideMenu = () => {
  const { isExpanded } = useSelector((state) => state.SideMenuReducer);
  const dispatch = useDispatch();

  return (
    <>
      <div className={`SideMenu ${!!isExpanded ? "expanded" : ""}`}>
        <div
          className="SideMenu__Brand"
          onClick={() => {
            window.location.pathname = "/";
          }}
        >
          <img alt="Logo" src={Logo} width="55px" />
          <div className="SideMenu__Title">React Tracker</div>
        </div>

        <ul className="SideMenu__List">
          {SideMenuData.map((val, key) => {
            return (
              <li
                key={key}
                className="row"
                id={window.location.pathname === val.link ? "active" : ""}
                onClick={() => {
                  if (!!val.link) {
                    window.location.pathname = val.link;
                  }

                  switch (val.label) {
                    case "Add Trip":
                      dispatch(setIsOpen(true));
                      dispatch(setPanelType("AddTrip"));
                      dispatch(setPanelTitle("Add Trip"));
                      break;
                    case "Trips":
                      dispatch(setIsOpen(true));
                      dispatch(setPanelType("Trips"));
                      dispatch(setPanelTitle("Trips"));
                      break;

                    default:
                      break;
                  }
                }}
              >
                <i id="icon" className={val.icon}></i>
                {!!isExpanded ? <span id="label">{val.label}</span> : ""}
              </li>
            );
          })}
        </ul>
        <div
          className="SideMenu__button"
          onClick={() => {
            dispatch(setIsExpanded(!isExpanded));
          }}
        >
          <i
            className={`pi pi-chevron${!!isExpanded ? "-left" : "-right"}`}
          ></i>
        </div>
      </div>
    </>
  );
};
export default SideMenu;
