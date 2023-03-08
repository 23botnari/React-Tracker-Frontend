import React, { useEffect, useState,useRef } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";

import { useDispatch } from "react-redux";
import { setIsOpen } from "../../../redux/actions/sidePanelActions";

import "./SidePanel.scss";

const SidePanelTemplate = ({
  isActive,
  panelType,
  panelTitle,
  panelSubmit,
}) => {
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({
    name: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    isActive: true,
  });
  const [map, setMap] = useState((null));
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const originRef = useRef();

  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }
  const dispatch = useDispatch();

  const createCompany = async (data) => {
    fetch("https://mockend.com/23botnari/teza/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };
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
        panelSubmit = calculateRoute;
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
        panelSubmit = createCompany();
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
            onClick={
              panelSubmit
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidePanelTemplate;
