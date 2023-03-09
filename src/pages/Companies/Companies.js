import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  setIsOpen,
  setPanelTitle,
  setPanelType,
} from "../../redux/actions/sidePanelActions";
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
          dispatch(setPanelType("editCompanies"));
          dispatch(setPanelTitle("Edit Company"));
        }}
      ></Button>
    );
  };

  return (
    <div className="CompaniesContent">
      <div className="CompaniesTableHeader">
        <div className="CompaniesTableHeader__text">
          <h2>Companies</h2>
          <div className="CompaniesTableHeader__button">
            <Button
              label="Add Company"
              icon="pi pi-plus"
              className="p-button-info mr-2"
              onClick={() => {
                dispatch(setIsOpen(true));
                dispatch(setPanelType("addCompanies"));
                dispatch(setPanelTitle("Add Company"));
              }}
            />
          </div>
        </div>
        <DataTable
          value={companies}
          responsiveLayout="scroll"
          rows={10}
          paginator
        >
          <Column field="name" header="Name" />
          <Column body={statusCircle} dataType="boolean" header="Is active	" />
          <Column field="createdAt" header="Created at	" />
          <Column field="updatedAt" header="Updated at	" />
          <Column body={editButton} header="Actions"></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default Companies;
