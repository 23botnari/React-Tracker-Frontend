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