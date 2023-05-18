import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';

const AddCompanies = ({ panelSubmit }) => {
  const [companyName, setCompanyName] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <>
      <InputText
        id="companyName"
        type="text"
        placeholder="Company"
        className="w-full mb-3"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

      <div className="flex align-items-center">
        <Checkbox
          id="checkIsActive"
          onChange={(e) => setChecked(e.checked)}
          checked={checked}
          value={checked}
          className="mr-2"
        />
        <label htmlFor="checkIsActive">Is Active</label>
      </div>
    </>
  );
};

export default AddCompanies;
