import React, { useState, useRef, useEffect } from "react";
import "./SidePanel.scss";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete } from "@react-google-maps/api";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { setIsOpen } from "../../../redux/actions/sidePanelActions";

import { Dropdown } from "primereact/dropdown";

import { addDrivers } from "../../../redux/actions/driversActions";

import {
  setDestinationPoint,
  setOriginPoint,
} from "../../../redux/actions/dashboardActions";

import { addCompany } from "../../../redux/actions/companiesActions";

const SidePanelTemplate = ({
  isActive,
  panelType,
  panelTitle,
  panelSubmit,
}) => {
  const [driverNumber, setDriverNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverSurname, setDriverSurname] = useState("");
  const [driverFullname, setDriverFullname] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [truckNumber, setTruckNumber] = useState("");
  const { driverRowData } = useSelector((state) => state.DriversReducer);

  const [company, setCompany] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [checked, setChecked] = useState(Boolean);
  const { companyRowData } = useSelector((state) => state.CompaniesReducer);

  const [trips, setTrips] = useState([]);
  const originRef = useRef();
  const destinationRef = useRef();

  const dispatch = useDispatch();
  const [refreshTable, setRefreshTable] = useState(false);

  useEffect(() => {
    getCompany();
    getDriver();
  }, []);

  useEffect(() => {
    getTrips();
  }, [refreshTable]);

  const addTrip = async (data) => {
    setRefreshTable(!refreshTable);

    const startPoint = originRef.current.value;
    const finalPoint = destinationRef.current.value;

    await fetch("http://localhost:4000/routes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        originRef: startPoint,
        destinationRef: finalPoint,
        driverName: driverName,
        driverSurname: driverSurname,
        driverNumber: driverNumber,
        companyName: company,
        truckNumber: truckNumber,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setIsOpen(false));
        dispatch(setOriginPoint(""));
        dispatch(setDestinationPoint(""));
        onDriverChange("");
        dispatch(setOriginPoint(""));
        dispatch(setDestinationPoint(""));
        window.alert("New Route was Added.");
      })
      .catch((error) => {
        console.error(error);
      });
    dispatch(setOriginPoint(originRef.current.value));
    dispatch(setDestinationPoint(destinationRef.current.value));
  };

  const getDriver = async (data) => {
    await fetch("http://localhost:4000/drivers")
      .then((response) => response.json())
      .then((data) => {
        const drivers = data.map((driver) => {
          return {
            label: `${driver.driverName} ${driver.driverSurname}`,
            value: driver._id, // Assuming the driver ID field is named "_id"
            driverName: driver.driverName,
            driverSurname: driver.driverSurname,
          };
        });
        setDrivers(drivers);
        console.log(drivers);
      })
      .catch((error) => console.error("Error is:", error));
  };
  const getDriverDetails = async (driverId) => {
    await fetch(`http://localhost:4000/drivers/${driverId}`)
      .then((response) => response.json())
      .then((data) => {
        const driver = data;
        if (driver) {
          setDriverName(driver.driverName);
          setDriverSurname(driver.driverSurname);
          setDriverNumber(driver.driverNumber);
          setCompany(driver.company);
          setTruckNumber(driver.truckNumber);
        } else {
          setDriverName("");
          setDriverSurname("");
          setDriverNumber("");
          setCompany("");
          setTruckNumber("");
        }
      })
      .catch((error) => console.error("Error is:", error));
  };

  const onDriverChange = (selectedDriver) => {
    setDriverFullname(selectedDriver.value); // Set driver name based on the label property
    getDriverDetails(selectedDriver.value);
  };

  const checkRoute = () => {
    dispatch(setOriginPoint(originRef.current.value));
    dispatch(setDestinationPoint(destinationRef.current.value));
  };

  const clearRoute = () => {
    dispatch(setOriginPoint((originRef.current.value = "")));
    dispatch(setDestinationPoint((destinationRef.current.value = "")));
    onDriverChange("");
  };

  const createMessage = async (data) => {
    fetch("https://mockend.com/23botnari/teza/companies", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const createDrivers = async (data) => {
    await fetch("http://localhost:4000/drivers/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driverNumber: driverNumber,
        company: company,
        driverName: driverName,
        driverSurname: driverSurname,
        truckNumber: truckNumber,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(addDrivers(true));
        dispatch(setIsOpen(false));
        setDriverNumber("");
        setCompany("");
        setDriverName("");
        setDriverSurname("");
        setTruckNumber("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editDrivers = async (data) => {
    await fetch(`http://localhost:4000/drivers/${driverRowData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        driverNumber: driverNumber,
        company: company,
        driverName: driverName,
        driverSurname: driverSurname,
        truckNumber: truckNumber,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(addDrivers(true));
        dispatch(setIsOpen(false));
        setDriverNumber("");
        setCompany("");
        setDriverName("");
        setDriverSurname("");
        setTruckNumber("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const createCompany = async (data) => {
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
      .then((data) => {
        dispatch(addDrivers(true));
        dispatch(setIsOpen(false));
        setCompanyName("");
        setChecked(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editCompany = async (data) => {
    await fetch(`http://localhost:4000/companies/${companyRowData._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        companyName: companyName,
        isActive: checked,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(addCompany(true));
        dispatch(setIsOpen(false));
        setCompanyName("");
        setChecked(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getTrips = async (data) => {
    await fetch("http://localhost:4000/routes")
      .then((response) => response.json())
      .then((data) => {
        const trips = data.map((trips) => trips);
        setTrips(trips);
      })
      .catch((error) => console.error(error));
  };

  const getCompany = async (data) => {
    await fetch("http://localhost:4000/companies")
      .then((response) => response.json())
      .then((data) => {
        const companies = data.map((company) => company.companyName);
        setCompanyNames(companies);
      })
      .catch((error) => console.error(error));
  };

  const Content = () => {
    switch (panelType) {
      case "Trips":
        return (
          <>
            {trips.map((trip, index) => (
              <div className="trips-container" key={index}>
                <div
                  className="trip"
                  onClick={() => {
                    dispatch(setOriginPoint(trip.originRef));
                    dispatch(setDestinationPoint(trip.destinationRef));
                  }}
                >
                  <div className="driver"> Driver: {trip.driverName +" " + trip.driverSurname}</div>
                  <div className="company">
                    <i className="pi pi-building"></i> Company:{" "}
                    {trip.companyName}
                  </div>
                  <div className="phone">
                    <i className="pi pi-phone"></i> Phone: {trip.driverNumber}
                  </div>
                  <div className="truck">
                    <i className="pi pi-car"></i> Truck Number:{" "}
                    {trip.truckNumber}
                  </div>
                  <div className="start">
                    <i className="pi pi-flag"></i> Start Point: {trip.originRef}
                  </div>
                  <div className="destination">
                    <i className="pi pi-flag-fill"></i> End Point:{" "}
                    {trip.destinationRef}
                  </div>
                  <div className="buttons">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-info ml-6 mr-1 mt-1"
                    />
                    <Button
                      icon="pi pi-envelope"
                      className="p-button-rounded p-button-warning mr-1"
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-danger left-auto"
                    />
                  </div>
                </div>
              </div>
            ))}
          </>
        );

      case "AddTrip":
        panelSubmit = addTrip;
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
                ref={destinationRef}
                className="w-full mb-3"
              />
            </Autocomplete>

            <Dropdown
              value={driverFullname}
              options={drivers}
              onChange={onDriverChange}
              placeholder="Driver"
              className="w-full mb-3"
            />

            <p>Phone number: {driverNumber}</p>
            <p>Company: {company}</p>
            <p>Truck number: {truckNumber}</p>

            <Button onClick={clearRoute}>Clear</Button>
            <Button onClick={checkRoute} style={{ marginLeft: "20px" }}>
              Check Route
            </Button>
          </>
        );

      case "addDriver":
        panelSubmit = createDrivers;
        return (
          <>
            <InputText
              id="driverNumber"
              type="text"
              placeholder="Phone"
              value={driverNumber}
              onChange={(e) => setDriverNumber(e.target.value)}
              className="w-full mb-3"
            />

            <Dropdown
              value={company}
              options={companyNames}
              onChange={(e) => setCompany(e.value)}
              placeholder="Company"
              className="w-full mb-3"
            />

            <InputText
              id="driverName"
              type="text"
              placeholder="Driver name"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full mb-3"
            />

            <InputText
              id="driverSurname"
              type="text"
              placeholder="Driver Surname"
              value={driverSurname}
              onChange={(e) => setDriverSurname(e.target.value)}
              className="w-full mb-3"
            />

            <InputText
              id="truckNumber"
              type="text"
              placeholder="Truck number"
              value={truckNumber}
              onChange={(e) => setTruckNumber(e.target.value)}
              className="w-full mb-3"
            />
          </>
        );

      case "editDrivers":
        panelSubmit = editDrivers;
        return (
          <>
            <InputText
              id="driverNumber"
              type="text"
              placeholder={`Phone : ${driverRowData.driverNumber}`}
              value={driverNumber}
              onChange={(e) => setDriverNumber(e.target.value)}
              className="w-full mb-3"
            />
            <InputText
              id="company"
              type="text"
              placeholder={`Company : ${driverRowData.company}`}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full mb-3"
            />
            <InputText
              id="driverName"
              type="text"
              placeholder={`Driver : ${driverRowData.driverName}`}
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="w-full mb-3"
            />
            <InputText
              id="driverSurname"
              type="text"
              placeholder={`Driver : ${driverRowData.driverSurname}`}
              value={driverSurname}
              onChange={(e) => setDriverSurname(e.target.value)}
              className="w-full mb-3"
            />
            <InputText
              id="truckNumber"
              type="text"
              placeholder={`Truck Number : ${driverRowData.truckNumber}`}
              value={truckNumber}
              onChange={(e) => setTruckNumber(e.target.value)}
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
              id="companyName"
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
        panelSubmit = editCompany;

        return (
          <>
            <InputText
              id="companyName"
              type="text"
              placeholder={`Name : ${companyRowData.companyName}`}
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
            {/* {panelType === "Drivers" ? "New Number" : "New Company"} */}
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
