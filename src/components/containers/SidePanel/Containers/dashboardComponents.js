import React from "react";
import { useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Autocomplete } from "@react-google-maps/api";
import { useDispatch } from "react-redux";
import {
    setDestinationPoint,
    setOriginPoint,
  } from "../../../../redux/actions/dashboardActions";
  
export const AddTrip = () => {
   const dispatch=useDispatch();
  const originRef = useRef();
  const destiantionRef = useRef();
  const calculateNewRoute = () => {
    dispatch(setOriginPoint(originRef.current.value));
    dispatch(setDestinationPoint(destiantionRef.current.value));
  };
  return (
    <>
      <Autocomplete>
        <InputText
          id="startPoint"
          type="text"
          placeholder="StartPoint"
          ref={originRef}
          className="w-full mb-3"
        />
      </Autocomplete>
      <Autocomplete>
        <InputText
          id="finalPoint"
          type="text"
          placeholder="Final Point"
          ref={destiantionRef}
          className="w-full mb-3"
        />
      </Autocomplete>
      <InputText
        id="company"
        type="text"
        placeholder="Company"
        className="w-full mb-3"
      />
      <InputText
        id="driverName"
        type="text"
        placeholder="Driver name"
        className="w-full mb-3"
      />
      <InputText
        id="truckNumber"
        type="text"
        placeholder="Truck number"
        className="w-full mb-3"
      />
      <InputText
        id="trailerNumber"
        type="text"
        placeholder="Trailer number"
        className="w-full mb-3"
      />
    </>
  );
};
