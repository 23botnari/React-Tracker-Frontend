import React, { useState, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../redux/actions/sidePanelActions.js";
import { setPhones } from "../../redux/actions/phonesActions.js";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Messages } from "primereact/messages";

import { FilterMatchMode } from "primereact/api";

import "./Phones.scss";

function Phones() {
  const { phones } = useSelector((state) => state.PhonesReducer);
  const dispatch = useDispatch();
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const getPhones = async () => {
    fetch("https://mockend.com/23botnari/teza/phones")
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
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const msgs = useRef(null);
  const deleteMessage = () => {
    msgs.current.show({
      severity: "success",
      summary: "Phone-number has been deleted succesfull.",
      closable: false,
      life: 2400,
    });
  };
  const actionButtons = () => {
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
          onClick={deleteMessage}
        />
      </>
    );
  };

  const refreshPage = () => {
    window.location.reload(false);
  };

  const searchKeywords = () => {
    return (
      <>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search keyword"
          />
        </span>
      </>
    );
  };

  return (
    <>
      <div className="PhoneContent">
        <div className="PhoneHeader">
          <div className="PhoneHeader__text">
            <h2>Numbers</h2>
            <div className="PhoneHeader__button">
              <Button
                label="Buy a number"
                icon="pi pi-plus"
                className="p-button-info mr-2"
                onClick={() => {
                  dispatch(setIsOpen(true));
                  dispatch(setPanelType("addPhones"));
                  dispatch(setPanelTitle("New Number"));
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
            "trailerNumber",
            "mpMobileUserId",
          ]}
        >
          <Column
            field="phoneNumber"
            header="Phone"
            style={{ width: "200px" }}
          />
          <Column field="company" header="Company	" />
          <Column field="driverName" header="Driver name	" />
          <Column field="truckNumber" header="Truck number	" />
          <Column field="trailerNumber" header="Trailer number" />
          <Column field="mpMobileUserId" header="MP mobile user id	" />
          <Column body={actionButtons} header={searchKeywords}></Column>
        </DataTable>
      </div>
      <div className="message">
        <Messages ref={msgs} />
      </div>
    </>
  );
}
export default Phones;
