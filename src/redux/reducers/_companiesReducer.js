import { ActionTypes } from "../constants/action-types";

const initialState = {
  companies: [],
};

export const CompaniesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_COMPANIES:
      return { ...state, companies: payload };
    default:
      return state;
  }
};
