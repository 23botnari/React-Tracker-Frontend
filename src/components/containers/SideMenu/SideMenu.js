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
import useToken from "../Login/useToken";

const SideMenu = () => {
  const { isExpanded } = useSelector((state) => state.SideMenuReducer);
  const dispatch = useDispatch();
  const { setToken } = useToken();
  const refreshPage = () => {
    document.location.reload(false);
  };
  return (
    <>
      <div className={`SideMenu ${!!isExpanded ? "expanded" : ""}`}>
        <div
          className="SideMenu__Brand"
          onClick={() => {
            window.location.pathname = "/dashboard";
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
                  if (val.link) {
                    window.location.pathname = val.link;
                  } else
                    switch (val.label) {
                      case "Trips":
                        dispatch(setIsOpen(true));
                        dispatch(setPanelType("Trips"));
                        dispatch(setPanelTitle("Trips"));
                        if (window.location.pathname !== "/dashboard")
                          window.location.pathname = "/dashboard";
                        break;
                      case "Add Trip":
                        dispatch(setIsOpen(true));
                        dispatch(setPanelType("AddTrip"));
                        dispatch(setPanelTitle("Add Trip"));
                        if (window.location.pathname !== "/dashboard")
                          window.location.pathname = "/dashboard";
                        break;
                   
                      default:
                        break;
                    }
                    if (val.label ==="Log Out"){
                      window.location.pathname = "/auth/login";
                      setToken(null);
                  
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
