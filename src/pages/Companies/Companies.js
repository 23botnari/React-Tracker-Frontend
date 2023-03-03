import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setIsOpen, setPanelType } from "../../redux/actions/sidePanelActions";
import { setCompanies } from "../../redux/actions/companiesActions";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import { formatDate } from "../../helpers/utils";

const Companies = () => {
  const { companies } = useSelector((state) => state.CompaniesReducer);

  const dispatch = useDispatch();

  const getCompanies = async () => {
    fetch("https://mockend.com/23botnari/teza/companies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data.map((item) => {
          item.createdAt = formatDate(item.createdAt);
          item.updatedAt = formatDate(item.updatedAt);
          return data;
        });
        dispatch(setCompanies(data));
      });
  };

  useEffect(() => {
    getCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statusCircle = (rowData) => {
    return (
      <i
        className={"pi pi-circle-fill"}
        style={{ color: rowData.isActive ? "green" : "red" }}
      ></i>
    );
  };

  const editButton = () => {
    return (
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info mr-2"
        onClick={() => {
          dispatch(setIsOpen(true));
          dispatch(setPanelType("Companies"));
        }}
      ></Button>
    );
  };

  return (
    <div className="CompaniesContent">
      <div className="CompaniesTable">
        <div className="CompaniesTableHeader">
          <div className="CompaniesTableHeader__text">
            <h3>Companies</h3>
            <div className="CompaniesTableHeader__button">
              <Button
                label="Add Company"
                icon="pi pi-plus"
                className="p-button-info mr-2"
                onClick={() => {
                  dispatch(setIsOpen(true));
                  dispatch(setPanelType("Companies"));
                }}
              />
              <label htmlFor="active" className="ml-2">
                Active:
              </label>
              <Checkbox
                inputId="active"
                checked={companiesIsActive}
                onChange={(e) => setCompanieIsActive(e.checked)}
              />
            </div>
          </div>
          <DataTable value={companies} responsiveLayout="scroll">
            <Column field="name" header="Name" />
            <Column body={statusCircle} dataType="boolean" header="Is active	" />
            <Column field="createdAt" header="Created at	" />
            <Column field="updatedAt" header="Updated at	" />
            <Column body={editButton} header="Actions"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
export default Companies;
