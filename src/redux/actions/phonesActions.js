import { ActionTypes } from "../constants/action-types";

export const setPhones = (phones) => {
  return {
    type: ActionTypes.SET_PHONES,
    payload: phones,
  };
};

export const addPhones = (status) => {
  return {
    type: ActionTypes.ADD_PHONES,
    payload: status,
  };
};

export const setPhoneRowData = (phoneRowData) => ({
  type: ActionTypes.SET_PHONE_ROW_DATA,
  payload: phoneRowData,
});