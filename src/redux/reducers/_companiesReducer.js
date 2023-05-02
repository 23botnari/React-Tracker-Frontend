import { ActionTypes } from "../constants/action-types";
const initialState = {
  companies: [],
  addCompany: false,
  companyRowData: null,
};

export const CompaniesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COMPANIES:
      return { ...state, companies: payload };
    case ActionTypes.ADD_COMPANY:
      return { ...state, addCompany: payload };


    case ActionTypes.SET_COMPANY_ROW_DATA:
      return { ...state, companyRowData: payload };

    default:
      return state;
  }
};
