import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ProductService } from "./ProductService";
import "./Companies.scss";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

function Companies() {
  const [visibleRight, setVisibleRight] = useState(false);
  const [companies, setCompanies] = useState([]);

  //useEffect(() => {
  //   ProductService.getProductsMini().then(data => setProducts(data));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = (event, company) => {
    setCompanies(company);
    console.log("Edit button clicked for id: ${company.code}");
  };
const actionButtons =function () {
  return(
    <React.Fragment>
       <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2"  />
    </React.Fragment>
  )
}
  return (
    <div>
      <div className="card">
        <h3>Companies</h3>
        <DataTable value={ProductService} responsiveLayout="scroll">
          <Column field="name" header="Name" />
          <Column field="isActive" header="Is active	" />
          <Column field="created" header="Created at	" />
          <Column field="updated" header="Updated at	" />
          <Column body={actionButtons} header="actions">
            <p>text</p>
          </Column>
        </DataTable>
      </div>
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
        <Button
          icon="pi pi-pencil"
          className="p-button-info"
          onClick={() => setVisibleRight(true)}
        />
      </div>
    </div>
  );
}
export default Companies;
