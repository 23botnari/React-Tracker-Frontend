import { ActionTypes } from "../constants/action-types";

export const setCompanies = (companies) => {
  return {
    type: ActionTypes.SET_COMPANIES,
    payload: companies,
  };
};

export const addCompany = (status) => {
  return {
    type: ActionTypes.ADD_COMPANY,
    payload: status,
  };
};
