import { ActionTypes } from "../constants/action-types";

export const setCompanies = (companies) => {
  return {
    type: ActionTypes.SET_COMPANIES,
    payload: companies,
  };
};

