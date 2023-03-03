import React, { useState } from "react";

import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";

import { useDispatch } from "react-redux";
import { setIsOpen } from "../../../redux/actions/sidePanelActions";

import "./SidePanel.scss";

const SidePanelTemplate = ({ isActive, panelType }) => {
  const [values, setValues] = useState({
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  });

  const dispatch = useDispatch();

  const createCompany = async (data) => {
    fetch("https://mockend.com/23botnari/teza/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <div className={`sidepanela ${!!isActive ? "active" : ""}`}>
      <div className="SidePanel">
        <div className="SidePanel__header">
          <div className="SidePanel__title">
            {panelType === "Phones" ? "New Number" : "New Company"}
          </div>
        </div>
        <div className="SidePanel__content">
          {panelType === "Phones" ? (
            <>
              <InputText
                id="phoneNumber"
                type="text"
                placeholder="Phone"
                className="w-full mb-3"
              />
              <InputText
                id="company"
                type="text"
                placeholder="Company"
                className="w-full mb-3"
              />
              <InputText
                id="driverName"
                type="text"
                placeholder="Driver name"
                className="w-full mb-3"
              />
              <InputText
                id="truckNumber"
                type="text"
                placeholder="Truck number"
                className="w-full mb-3"
              />
              <InputText
                id="trailerNumber"
                type="text"
                placeholder="Trailer number"
                className="w-full mb-3"
              />
              <InputText
                id="mpMobileUserId"
                type="text"
                placeholder="MP mobile user id"
                className="w-full mb-3"
              />
              <InputText
                id="email"
                type="text"
                placeholder="Email address"
                className="w-full mb-3"
              />
            </>
          ) : (
            <>
              <InputText
                id="company"
                type="text"
                placeholder="Company"
                className="w-full mb-3"
                value={values.name}
                onChange={(e) => {
                  setValues((prev) => ({ ...prev, name: e.target.value }));
                }}
              />

              <div className="flex align-items-center">
                <Checkbox id="isActive" checked={true} className="mr-2" />
                <label htmlFor="isActive">Is Active</label>
              </div>
            </>
          )}
        </div>
        <div className="SidePanel__footer">
          <button
            className="p-element p-button-secondary p-button-outlined p-button p-component"
            onClick={() => {
              dispatch(setIsOpen(false));
            }}
          >
            Close
          </button>
          <button
            className="p-element p-button-success p-button p-component"
            onClick={() => {
              createCompany(values);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanelTemplate;
