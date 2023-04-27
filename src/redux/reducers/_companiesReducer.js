import { ActionTypes } from "../constants/action-types";
const initialState = {
  companies: [],
  addCompany: false,

};

export const CompaniesReducer = (state = initialState, {  type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COMPANIES:
      return { ...state, companies: payload };
      case ActionTypes.ADD_COMPANY:
        return { ...state, addCompany: payload };
    // other cases...
    default:
      return state;
  }
};
