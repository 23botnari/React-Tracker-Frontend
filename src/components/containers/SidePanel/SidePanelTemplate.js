import React, { useEffect, useState } from "react";

import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";

import { useDispatch } from "react-redux";
import { setIsOpen } from "../../../redux/actions/sidePanelActions";

import "./SidePanel.scss";

const SidePanelTemplate = ({ isActive, panelType, panelTitle, props }) => {
  const [checked, setChecked] = useState(false);
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
    })
  };

  

  const Content = () => {
    switch (panelType) {
      case "Phones":
        return (
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
        );

      case "Companies":
        return (
          <>
            <InputText
              id="company"
              type="text"
              placeholder="Company"
              className="w-full mb-3"
              value={values.name || ""}
              onChange={(e) => {
                setValues((prev) => ({ ...prev, name: e.target.value }));
              }}
            />

            <div className="flex align-items-center">
              <Checkbox
                id="checkIsActive"
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
                value={values.isActive}
                className="mr-2"
              />
              <label htmlFor="checkIsActive">Is Active</label>
            </div>
          </>
        );
      case "ReadMessages":
        return (
          <>
            <div className="Message">
              <div className="Message-details">
                <span style={{ color: "gray" }}>From:</span>
              </div>
              <div className="Message-text">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </div>
            </div>
          </>
        );
      case "SendMessages":
        return (
          <>
            <InputText
              id="numbermess"
              type="text"
              placeholder="Number"
              className="w-full mb-3"
            />
            <InputTextarea
              autoResize
              id="message"
              type="text"
              placeholder="Message"
              className="w-full mb-3"
            />
          </>
        );
      default:
        return <></>;
    }
  };
  return (
    <div className={`Panel ${!!isActive ? "active" : ""}`}>
      <div className="SidePanel">
        <div className="SidePanel__header">
          <div className="SidePanel__title">
            <h3>{panelTitle}</h3>
            {/* {panelType === "Phones" ? "New Number" : "New Company"} */}
          </div>
        </div>
        <div className="SidePanel__content">{Content(panelType)}</div>
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
