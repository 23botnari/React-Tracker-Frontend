import { ActionTypes } from "../constants/action-types";

export const setDrivers = (driver) => {
  return {
    type: ActionTypes.SET_DRIVERS,
    payload: driver,
  };
};

export const addDrivers = (status) => {
  return {
    type: ActionTypes.ADD_DRIVERS,
    payload: status,
  };
};

export const setDriverRowData = (driverRowData) => ({
  type: ActionTypes.SET_DRIVER_ROW_DATA,
  payload: driverRowData,
});