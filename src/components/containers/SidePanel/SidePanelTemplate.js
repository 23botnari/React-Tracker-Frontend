import React, { useState, useRef, useCallback } from "react";
import "./SidePanel.scss";
import { Autocomplete } from "@react-google-maps/api";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../../../redux/actions/sidePanelActions";

import {
  setDestinationPoint,
  setOriginPoint,
} from "../../../redux/actions/dashboardActions";

const SidePanelTemplate = ({
  isActive,
  panelType,
  panelTitle,
  panelSubmit,
}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState("");

  const originRef = useRef();
  const destiantionRef = useRef();

  const calculateNewRoute = () => {
    dispatch(setOriginPoint(originRef.current.value));
    dispatch(setDestinationPoint(destiantionRef.current.value));
  };

  function clearRoute() {
    dispatch(setOriginPoint((originRef.current.value = "")));
    dispatch(setDestinationPoint((destiantionRef.current.value = "")));
  }

  const createPhone = async (data) => {
    fetch("https://mockend.com/23botnari/teza/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  const createTrip = async (data) => {
    fetch("https://mockend.com/23botnari/teza/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  const createMessage = async (data) => {
    fetch("https://mockend.com/23botnari/teza/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
  const [companyName, setCompanyName] = useState("");
  const [checked, setChecked] = useState(Boolean);

  const createCompany = async () => {
    await fetch("http://localhost:4000/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: companyName,
        isActive: checked,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
  };
  const editCompany = async (data) => {
    fetch("https://mockend.com/23botnari/teza/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const Content = () => {
    switch (panelType) {
      case "Trips":
        return <></>;

      case "AddTrip":
        panelSubmit = calculateNewRoute;
        return (
          <>
            <Autocomplete>
              <InputText
                id="startPoint"
                type="text"
                placeholder="StartPoint"
                ref={originRef}
                className="w-full mb-3"
              />
            </Autocomplete>
            <Autocomplete>
              <InputText
                id="finalPoint"
                type="text"
                placeholder="Final Point"
                ref={destiantionRef}
                className="w-full mb-3"
              />
            </Autocomplete>
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
            <Button onClick={clearRoute}>Clear</Button>
          </>
        );

      case "addPhones":
        panelSubmit = createPhone();
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

      case "ReadMessages":
        panelSubmit = !setIsOpen();
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
        panelSubmit = createMessage();
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

      case "addCompanies":
        panelSubmit = createCompany;

        return (
          <>
            <InputText
              id="company"
              type="text"
              placeholder="Company"
              className="w-full mb-3"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <div className="flex align-items-center">
              <Checkbox
                id="checkIsActive"
                onChange={(e) => setChecked(e.checked)}
                checked={checked}
                value={checked}
                className="mr-2"
              />
              <label htmlFor="checkIsActive">Is Active</label>
            </div>
          </>
        );

      case "editCompanies":
        panelSubmit = editCompany();
        return (
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
            type="submit"
            onClick={panelSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanelTemplate;
