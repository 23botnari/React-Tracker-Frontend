import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../redux/actions/sidePanelActions.js";
import {  setPhones } from "../../redux/actions/phonesActions.js";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";

import { FilterMatchMode } from "primereact/api";

import "./Phones.scss";

function Phones() {
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  const msgs = useRef(null);
  const dispatch = useDispatch();

  const { phones,addPhones } = useSelector((state) => state.PhonesReducer);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getPhones = async () => {
    fetch("http://localhost:4000/phones")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setPhones(data));
        return [...Button(data || [])].map((d) => {
          return d;
        });
      });
  };

  useEffect(() => {
    getPhones();
  }, [refreshTable,addPhones]);

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

  const deletePhone = async (_id) => {
    await fetch(`http://localhost:4000/phones/${_id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Driver?")) {
      deletePhone(id)
        .then(() => {
          setRefreshTable(!refreshTable);
        })
        .catch((error) => {
          console.log(error);
        });
      setPhones(phones.filter((phone) => phone._id !== id));
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
            dispatch(setPanelType("editPhones"));
            dispatch(setPanelTitle("Update Number"));
          }}
        />
        <Button
          icon="pi pi-envelope"
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("ReadMessages"));
            dispatch(setPanelTitle("Messages - "));
          }}
        />
        <Button
          icon="pi pi-send"
          className="p-button-rounded p-button-help mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("SendMessages"));
            dispatch(setPanelTitle("Send Message -"));
          }}
        />
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
      <div className="PhoneContent">
        <div className="PhoneHeader">
          <div className="PhoneHeader__text">
            <h2>Drivers</h2>
            <div className="PhoneHeader__button">
              <Button
                label="Add a Driver"
                icon="pi pi-plus"
                className="p-button-info mr-2"
                onClick={() => {
                  dispatch(setIsOpen(true));
                  dispatch(setPanelType("addPhones"));
                  dispatch(setPanelTitle("New Driver Contact"));
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
          value={phones}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          paginator
          rows={7}
          responsiveLayout="scroll"
          dataKey="id"
          filters={filters}
          globalFilterFields={[
            "phoneNumber",
            "company",
            "driverName",
            "truckNumber",
          ]}
        >
          <Column
            field="phoneNumber"
            header="Phone"
            style={{ width: "200px" }}
          />
          <Column field="company" header="Company	" />
          <Column field="driverName" header="Driver name	" />
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
export default Phones;
