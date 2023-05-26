import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../redux/actions/sidePanelActions.js";
import {
  setDriverRowData,
  setDrivers,
} from "../../redux/actions/driversActions.js";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";

import { FilterMatchMode } from "primereact/api";
import { fetchData } from "../../helpers/apiServices";

import "./Drivers.scss";

function Drivers() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  const msgs = useRef(null);
  const dispatch = useDispatch();

  const { drivers, addDrivers } = useSelector((state) => state.DriversReducer);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
useEffect(() => {
    getDrivers();
  }, [refreshTable, addDrivers]);

  const getDrivers = async () => {
   await fetchData("drivers")
     
      .then((data) => {
        dispatch(setDrivers(data));
      });
  };

  
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const deleteMessage = () => {
    msgs.current.show({
      severity: "success",
      summary: "Driver was deleted succesfully.",
      closable: false,
      life: 2400,
    });
  };

  const deleteDriver = async (_id) => {
    const options = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    };
  
    await fetchData(`drivers/${_id}`, options)
    
      .catch(error => {
        console.error(error);
      });
  };
  
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Driver?")) {
      deleteDriver(id)
        .then(() => {
          setRefreshTable(!refreshTable);
        })
        .catch((error) => {
          console.log(error);
        });
      setDrivers(drivers.filter((Driver) => Driver._id !== id));
      deleteMessage();
    }
  };

  const actionButtons = (rowData) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("editDrivers"));
            dispatch(setPanelTitle("Update Number"));
            dispatch(setDriverRowData(rowData));
          }}
        />
        {/* <Button
          icon="pi pi-envelope"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("ReadMessages"));
            dispatch(setPanelTitle("Messages - "));
          }} */}
        {/* /> */}
        {/* <Button
          icon="pi pi-send"
          className="p-button-rounded p-button-help mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("SendMessages"));
            dispatch(setPanelTitle("Send Message -"));
          }}
        /> */}
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mr-2"
          onClick={() => handleDelete(rowData._id)}
        />
      </>
    );
  };

  const refreshPage = () => {
    setRefreshTable(!refreshTable);
  };

  const searchKeywords = () => {
    return (
      <div style={{ paddingLeft: "50px" }}>
        <div className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search keyword"
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="DriverContent">
        <div className="DriverHeader">
          <div className="DriverHeader__text">
            <h2>Drivers</h2>
            <div className="DriverHeader__button">
              <Button
                label="Add a Driver"
                icon="pi pi-plus"
                className="p-button-info mr-2"
                onClick={() => {
                  dispatch(setIsOpen(true));
                  dispatch(setPanelType("addDriver"));
                  dispatch(setPanelTitle("New Driver"));
                }}
              />
              <Button
                icon="pi pi-replay"
                className="p-button-secondary p-button-rounded p-button-outlined mr-2"
                aria-label="Bookmark"
                onClick={refreshPage}
              />
            </div>
          </div>
        </div>
        <DataTable
          value={drivers}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          paginator
          rows={7}
          responsiveLayout="scroll"
          dataKey="id"
          filters={filters}
          globalFilterFields={[
            "driverNumber",
            "company",
            "driverName",
            "driverSurname",  
            "truckNumber",
          ]}
        >
          <Column
            field="driverNumber"
            header="Phone"
            style={{ width: "200px" }}
          />
          <Column field="company" header="Company	" />
          <Column
            field={(driver) => driver.driverName + " " + driver.driverSurname}
            header="Driver"
          />
          <Column field="truckNumber" header="Truck number	" align={"center"} />
          <Column body={actionButtons} header="Actions" align={"center"} />
          <Column header={searchKeywords} align={"right"} />
        </DataTable>
      </div>
      <div className="message">
        <Messages ref={msgs} />
      </div>
    </>
  );
}
export default Drivers;
