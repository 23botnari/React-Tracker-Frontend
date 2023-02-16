import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CompaniesService } from "./CompaniesService";
import "./Companies.scss";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import CustomDialog from "./../../components/containers/SidePanel/Dialog"
function Companies() {
  const [companies, setCompanies] = useState("");
  const [companiesName, setCompaniesName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    CompaniesService.getCompanies().then((data) => setCompanies(data));
  }, []);

  const statusCircle = (rowData) => {
    return (
      <i
        className={"pi pi-circle-fill"}
        style={{ color: rowData.isActive ? "green" : "red" }}
      ></i>
    );
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const onClose = () => setModalOpen(false);
  const actionButtons = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => setModalOpen(!isModalOpen)}>
        </Button>
      </React.Fragment>
    );
  };

  const handleAddElement = () => {
    setCompanies([
      ...companies,
      { id: companies.length + 1, name: companiesName },
    ]);
  };
  const handleElementNameChange = (event) => {
    setCompaniesName(event.target.value);
  };

  return (
    <div>
      <div className="CompaniesHeader">
        <div className="CompaniesHeader__text">
          <h3>Companies</h3>
          <div className="CompaniesHeader__button">
            <Button
              label="Add Company"
              icon="pi pi-plus"
              className="p-button-info mr-2"
              onClick={handleAddElement}
            />
            <InputText
              id="name"
              value={companies.name}
              onChange={handleElementNameChange}
            />
          </div>
        </div>
        <DataTable value={companies} responsiveLayout="scroll">
          <Column field="name" header="Name" />
          <Column body={statusCircle} dataType="boolean" header="Is active	" />
          <Column field="created" header="Created at	" />
          <Column field="updatedAt" header="Updated at	" />
          <Column body={actionButtons} header="Actions"></Column>
        </DataTable>
      </div>
      {isModalOpen && (
        <CustomDialog
          onClose={onClose}
        />
      )}
    </div>
  );
}
export default Companies;
