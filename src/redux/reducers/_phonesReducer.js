import { ActionTypes } from "../constants/action-types";

const initialState = {
  phones: [],
  phone: {},
  addPhones: false,
};

export const PhonesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PHONES:
      return { ...state, phones: payload };
    case ActionTypes.ADD_PHONES:
      return { ...state, addPhones: payload };
    case ActionTypes.SET_SELECTED_PHONE:
      return { ...state, phone: payload };
    default:
      return state;
  }
};
