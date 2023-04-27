import React, { useEffect, useRef } from "react";

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
import { Messages } from "primereact/messages";
import { useState } from "react";
import { formatDate } from "../../helpers/utils";
import { store } from "../../redux/store";

const Companies = () => {
  const [refreshTable, setRefreshTable] = useState(false);

  const { companies, addCompany } = useSelector(
    (state) => state.CompaniesReducer
  );

  const dispatch = useDispatch();

  const getCompanies = () => {
    fetch("http://localhost:4000/companies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data?.map((item) => {
          item.createdAt = formatDate(item.createdAt);
          item.updatedAt = formatDate(item.updatedAt);
          return data;
        });
        dispatch(setCompanies(data));
      });
  };

  useEffect(() => {
    getCompanies();
  }, [refreshTable, addCompany]);
  console.log(companies);

  const statusCircle = (rowData) => {
    return (
      <i
        className={"pi pi-circle-fill"}
        style={{ color: rowData.isActive ? "green" : "red" }}
      ></i>
    );
  };
  const msgs = useRef(null);
  const deleteMessage = () => {
    msgs.current.show({
      severity: "success",
      summary: "Company has been deleted succesful.",
      closable: false,
      life: 2400,
    });
  };
  const deleteCompany = async (_id) => {
    await fetch(`http://localhost:4000/companies/${_id}`, {
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
    if (window.confirm("Are you sure you want to delete this company?")) {
      deleteCompany(id).then(() => {
        setRefreshTable(!refreshTable);
      });
      setCompanies(companies.filter((company) => company._id !== id));
      // deleteMessage()
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
            dispatch(setPanelType("editCompanies"));
            dispatch(setPanelTitle("Edit Company"));
          }}
        ></Button>
        <Button
          icon="pi pi-shopping-cart"
          className="p-button-rounded p-button-danger mr-2"
          onClick={() => handleDelete(rowData._id)}
        />
      </>
    );
  };
  const refreshPage = () => {
    setRefreshTable(!refreshTable);
  };

  return (
    <>
      <div className="CompaniesContent">
        <div className="CompaniesTableHeader">
          <div className="CompaniesTableHeader__text">
            <h2>Companies </h2>
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
              <Button
                icon="pi pi-replay"
                className="p-button-secondary p-button-rounded p-button-outlined mr-2"
                aria-label="Bookmark"
                onClick={refreshPage}
              />
            </div>
          </div>
          <DataTable
            value={companies}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            paginator
            rows={7}
            responsiveLayout="scroll"
          >
            <Column field="companyName" header="Name" />
            <Column body={statusCircle} dataType="boolean" header="Is active	" />
            <Column field="createdAt" header="Created at	" />
            <Column field="updatedAt" header="Updated at	" />
            <Column body={actionButtons} header="Actions"></Column>
          </DataTable>
        </div>
      </div>
      <div className="message">
        <Messages ref={msgs} />
      </div>
    </>
  );
};
export default Companies;
