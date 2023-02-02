import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProductService}  from './ProductService';
import "./Companies.css";

const Companies =() => {
    const [companies, setCompanies] = useState([]);

    //useEffect(() => {
     //   ProductService.getProductsMini().then(data => setProducts(data));
   // }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  const handleEdit = (event,company ) => {
    setCompanies(company);
    console.log('Edit button clicked for id: ${company.code}');
  
  };
  
    return (
        <div>
            <div className="card">
            <DataTable editMode='row' value={ProductService} responsiveLayout="scroll">      
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column field="category" header="Age" />
            <Column  field="quantity" header="quantity"/>
            <Column  rowEditor/>
                </DataTable>
            </div>
        </div>
    );
} 
export default Companies;