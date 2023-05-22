import { ActionTypes } from "../constants/action-types";

const initialState = {
  drivers: [],
  addDrivers: false,
  driverRowData:null,
};

export const DriversReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_DRIVERS:
      return { ...state, drivers: payload };
    case ActionTypes.ADD_DRIVERS:
      return { ...state, addDrivers: payload };
      
     case ActionTypes.SET_DRIVER_ROW_DATA:
    return { ...state, driverRowData: payload };

    default:
      return state;
  }
};
