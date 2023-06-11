import React, { useState, useRef, useEffect } from "react";
import "./SidePanel.scss";
import { useDispatch, useSelector } from "react-redux";

import { Autocomplete } from "@react-google-maps/api";
import { InputText } from "primereact/inputtext";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { setIsOpen } from "../../../redux/actions/sidePanelActions";
import { Messages } from "primereact/messages";

import { Dropdown } from "primereact/dropdown";
import useToken from "../Login/useToken";
import jwt_decode from "jwt-decode";

import { addDrivers } from "../../../redux/actions/driversActions";

import {
  setDestinationPoint,
  setOriginPoint,
} from "../../../redux/actions/dashboardActions";

import { addCompany } from "../../../redux/actions/companiesActions";
import { fetchData } from "../../../helpers/apiServices";

const SidePanelTemplate = ({
  isActive,
  panelType,
  panelTitle,
  panelSubmit,
}) => {
  const [driverId, setDriverId] = useState("");
  const [driverNumber, setDriverNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverSurname, setDriverSurname] = useState("");
  const [driverFullname, setDriverFullname] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [truckNumber, setTruckNumber] = useState("");

  const [company, setCompany] = useState("");
  const [companyNames, setCompanyNames] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [checked, setChecked] = useState(Boolean);

  const [trips, setTrips] = useState([]);
  const originRef = useRef();
  const destinationRef = useRef();
  const msg = useRef(null);

  const { driverRowData } = useSelector((state) => state.DriversReducer);
  const { companyRowData } = useSelector((state) => state.CompaniesReducer);

  const [refreshTable, setRefreshTable] = useState(false);
  const [displayButtons, setDisplayButtons] = useState(false);

  const { getToken } = useToken();
  const dispatch = useDispatch();

  useEffect(() => {
    getCompany();
    getDriver();
    buttons();
    getTrips();
  }, []);

  useEffect(() => {
    getTrips();
  }, [refreshTable]);

  const addTrip = async (data) => {
    try {
      setRefreshTable(!refreshTable);

      const startPoint = originRef.current.value;
      const finalPoint = destinationRef.current.value;

      const name = driverName + " " + driverSurname;
      const driverUser = await fetchUserByName(name);
      const userId = driverUser._id;
      console.log(userId);

      await fetch("http://localhost:4000/routes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originRef: startPoint,
          destinationRef: finalPoint,
          driverId: userId,
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
          dispatch(setOriginPoint(""));
          dispatch(setDestinationPoint(""));
          onDriverChange("");
          dispatch(setOriginPoint(""));
          dispatch(setDestinationPoint(""));
          setOriginPoint("0");
          setDestinationPoint("");
          getTrips();
          window.alert("New Route was Added.");
        })
        .catch((error) => {
          console.error(error);
        });

      dispatch(setOriginPoint(originRef.current.value));
      dispatch(setDestinationPoint(destinationRef.current.value));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserByName = async (name) => {
    try {
      const response = await fetchData(`users?name=${name}`);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getDriver = async (data) => {
    try {
      const drivers = await fetchData("drivers");
      const formattedDrivers = drivers.map((driver) => ({
        label: `${driver.driverName} ${driver.driverSurname}`,
        value: driver._id,
        driverName: driver.driverName,
        driverSurname: driver.driverSurname,
      }));
      setDrivers(formattedDrivers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDriverDetails = async (driverId) => {
    try {
      const driver = await fetchData(`drivers/${driverId}`);
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
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onDriverChange = (selectedDriver) => {
    setDriverFullname(selectedDriver.value);
    setDriverId(selectedDriver.value);
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

  const createDrivers = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverNumber: driverNumber,
          company: company,
          driverName: driverName,
          driverSurname: driverSurname,
          truckNumber: truckNumber,
        }),
      };

      await fetchData("drivers", options)
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
    } catch (error) {
      console.error(error);
    }
  };

  const editDrivers = async (data) => {
    try {
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverNumber: driverNumber,
          company: company,
          driverName: driverName,
          driverSurname: driverSurname,
          truckNumber: truckNumber,
        }),
      };

      await fetchData(`drivers/${driverRowData._id}`, options)
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
    } catch (error) {
      console.error(error);
    }
  };

  const createCompany = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName,
          isActive: checked,
        }),
      };

      await fetchData("companies", options)
        .then((data) => {
          dispatch(addDrivers(true));
          dispatch(setIsOpen(false));
          setCompanyName("");
          setChecked(false);
          getCompany();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const editCompany = async (data) => {
    try {
      const options = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName,
          isActive: checked,
        }),
      };

      await fetchData(`companies/${companyRowData._id}`, options)
        .then((data) => {
          dispatch(addCompany(true));
          dispatch(setIsOpen(false));
          setCompanyName("");
          setChecked(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getTrips = async () => {
    const token = getToken();
    const decodedToken = jwt_decode(token);
    const userId = decodedToken._id;
    const userRole = await fetchUserRole(token);

    try {
      const url = userRole === "driver" ? `routes/${userId}` : "routes";

      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetchData(url, options);

      const filteredTrips =
        userRole === "driver"
          ? response.filter((trip) => trip.driverId === userId)
          : response;

      setTrips(filteredTrips);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUserRole = async (token) => {
    try {
      const token = getToken();
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetchData("auth/role", options);

      return response.role;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const getCompany = async (data) => {
    try {
      const response = await fetchData("companies");

      const companies = response.map((company) => company.companyName);
      setCompanyNames(companies);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTrip = async (tripId) => {
    try {
      const response = await fetchData(`routes/${tripId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        getTrips();
        tripDeleted();
        dispatch(setOriginPoint(""));
        dispatch(setDestinationPoint(""));
      } else {
        console.log("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const buttons = async () => {
    try {
      const token = getToken();
      const userRole = await fetchUserRole(token);
      if (userRole === "operator") {
        setDisplayButtons(true);
      } else {
        setDisplayButtons(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const tripDeleted = () => {
    if (msg.current) {
      msg.current.show({
        severity: "success",
        summary: "Trip was deleted successfully.",
        closable: false,
        life: 2400,
      });
    }
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
                  <div className="driver">
                    {" "}
                    Driver: {trip.driverName + " " + trip.driverSurname}
                  </div>
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
                    {" "}
                    {displayButtons && (
                      <>
                        <Button
                          icon="pi pi-pencil"
                          className="p-button-rounded p-button-info ml-7 mr-4 mt-1"
                        />
                        <Button
                          icon="pi pi-trash"
                          className="p-button-rounded p-button-danger left-auto"
                          onClick={() => deleteTrip(trip._id)}
                        />
                      </>
                    )}
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
          </div>
        </div>
        <div className="SidePanel__content">{Content(panelType)}</div>
        <div className="message">
          <Messages ref={msg} />
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
