import React, { useState, useEffect } from "react";
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

  const { setToken, getToken } = useToken();
  const [username, setUsername] = useState("");

  const [userRole, setUserRole] = useState("");

  const refreshPage = () => {
    document.location.reload(false);
  };

  useEffect(() => {
    fetchUsername();
    fetchUserRole();
  }, []);

  const fetchUserRole = async () => {
    try {
      const token = getToken(); // Retrieve the authentication token from wherever you store it
      const response = await fetch("http://localhost:4000/auth/role", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserRole(data.role);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsername = async () => {
    try {
      const token = getToken();
      const response = await fetch("http://localhost:4000/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUsername(data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMenuItems = () => {
    return SideMenuData.map((val, key) => {
      if (
        userRole === "operator" ||
        (userRole === "driver" &&
          val.label !== "Companies" &&
          val.label !== "Add Trip" &&
          val.label !== "Drivers")
      ) {
        return (
          <li
            key={key}
            className="row"
            id={window.location.pathname === val.link ? "active" : ""}
            onClick={() => {
              if (val.link) {
                window.location.pathname = val.link;
              } else {
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
              }
              if (val.label === "Log Out") {
                window.location.pathname = "/auth/login";
                setToken(null);
              }
            }}
          >
            <i id="icon" className={val.icon}></i>
            {!!isExpanded ? <span id="label">{val.label}</span> : ""}
          </li>
        );
      } else {
        return null;
      }
    });
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
        <div className="SideMenu__Welcome">
          Welcome, <span style={{fontWeight:"bold"}}>{username}</span>
        </div>
        <ul className="SideMenu__List">{renderMenuItems()}</ul>

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
