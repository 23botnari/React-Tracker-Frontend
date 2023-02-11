import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { PhoneService } from "./PhonesData.js";
import "./Phones.scss";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Phones() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [companies, setCompanies] = useState([]);

<<<<<<< HEAD
  const actionButtons = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
        />
        <Button
          icon="pi pi-envelope"
          className="p-button-rounded p-button-warning mr-2"
        />
        <Button
          icon="pi pi-send"
          className="p-button-rounded p-button-help mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger mr-2"
        />
      </React.Fragment>
    );
  };
=======

  const actionButtons = () => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" />
        <Button icon="pi pi-envelope" className="p-button-rounded p-button-warning mr-2" />
        <Button icon="pi pi-send" className="p-button-rounded p-button-help mr-2" />
        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mr-2" />
      </React.Fragment>
    )
  }
>>>>>>> e8d6dd503f78358b50d9a653f775f1304a0a8a58
  const searchKeywords = () => {
    return (
      <React.Fragment>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Search keyword" />
        </span>
      </React.Fragment>
<<<<<<< HEAD
    );
  };
=======
    )
  }
>>>>>>> e8d6dd503f78358b50d9a653f775f1304a0a8a58
  return (
    <div>
      <div className="PhoneHeader">
        <div className="PhoneHeader__text">
          <h2>Numbers</h2>
          <div className="PhoneHeader__button">
            <Button
              label="Buy a number"
              icon="pi pi-plus"
              className="p-button mr-2"
            />
            <Button
              icon="pi pi-replay"
              className="p-button-secondary p-button-rounded p-button-outlined mr-2"
              aria-label="Bookmark"
            />
          </div>
        </div>
      </div>
      <DataTable value={PhoneService} responsiveLayout="scroll">
        <Column field="phone" header="Phone" style={{ width: "200px" }} />
        <Column field="company" header="Company	" />
        <Column field="driver" header="Driver name	" />
        <Column field="truck" header="Truck number	" />
        <Column field="trailer" header="Trailer number" />
        <Column field="mpmobile" header="MP mobile user id	" />
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
