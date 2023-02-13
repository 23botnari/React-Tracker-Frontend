import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CompanyService } from "./CompanyService";
import "./Companies.scss";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Companies() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [value, setValue] = useState("");

  //useEffect(() => {
  //   ProductService.getProductsMini().then(data => setProducts(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const actionButtons = () => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-info mr-2"
          onClick={() => setVisibleRight(true)}
        />
      </React.Fragment>
    );
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
            />
          </div>
        </div>
        <DataTable value={CompanyService} responsiveLayout="scroll">
          <Column field="name" header="Name" />
          <Column field="isActive" header="Is active	" />
          <Column field="created" header="Created at	" />
          <Column field="updated" header="Updated at	" />
          <Column body={actionButtons} header="Actions"></Column>
        </DataTable>
      </div>
      <div className="card flex justify-content-center">
        <Sidebar
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
          className="w-full md:w-20rem lg:w-30rem"
          modal={null}
        >
          <h2>Update Company</h2>
          <InputText value={value} onChange={(e) => setValue(e.target.value)} />
        </Sidebar>
      </div>
    </div>
  );
}
export default Companies;
