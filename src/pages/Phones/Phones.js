import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../redux/actions/sidePanelActions.js";
import { setPhones } from "../../redux/actions/phonesActions.js";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import "./Phones.scss";

function Phones() {
  const [visibleRight, setVisibleRight] = useState(false);
  const { phones } = useSelector((state) => state.PhonesReducer);

  const dispatch = useDispatch();

  const getPhones = async () => {
    fetch("https://mockend.com/23botnari/teza/phones")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        dispatch(setPhones(data));
      });
  };

  useEffect(() => {
    getPhones();
  }, []);

  const actionButtons = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => {
            dispatch(setIsOpen(true));
            dispatch(setPanelType("Phones"));
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
        />
      </React.Fragment>
    );
  };

  const searchKeywords = () => {
    return (
      <React.Fragment>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search keyword" />
        </span>
      </React.Fragment>
    );
  };

  return (
    <div>
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
                dispatch(setPanelType("Phones"));
                dispatch(setPanelTitle("New Number"));
              }}
            />
            <Button
              icon="pi pi-replay"
              className="p-button-secondary p-button-rounded p-button-outlined mr-2"
              aria-label="Bookmark"
            />
          </div>
        </div>
      </div>
      <DataTable value={phones} responsiveLayout="scroll">
        <Column field="phoneNumber" header="Phone" style={{ width: "200px" }} />
        <Column field="company" header="Company	" />
        <Column field="driverName" header="Driver name	" />
        <Column field="truckNumber" header="Truck number	" />
        <Column field="trailerNumber" header="Trailer number" />
        <Column field="mpMobileUserId" header="MP mobile user id	" />
        <Column body={actionButtons} header={searchKeywords}>
          <p>text</p>
        </Column>
      </DataTable>
      <div className="card flex justify-content-center">
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
          className="w-full md:w-20rem lg:w-30rem"
        >
          <h2>Sidebar</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Sidebar>
      </div>
    </div>
  );
}
export default Phones;
