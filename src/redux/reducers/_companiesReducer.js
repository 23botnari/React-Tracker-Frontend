import { ActionTypes } from "../constants/action-types";

const initialState = {
  companies: [],
  company: {},
};

export const CompaniesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COMPANIES:
      return { ...state, companies: payload };
    case ActionTypes.SET_SELECTED_COMPANY:
      return { ...state, company: payload };
    default:
      return state;
  }
};
