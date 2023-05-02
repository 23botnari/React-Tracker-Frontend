import { ActionTypes } from "../constants/action-types";

const initialState = {
  phones: [],
  addPhones: false,
  phoneRowData:null,
};

export const PhonesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_PHONES:
      return { ...state, phones: payload };
    case ActionTypes.ADD_PHONES:
      return { ...state, addPhones: payload };
      
     case ActionTypes.SET_PHONE_ROW_DATA:
    return { ...state, phoneRowData: payload };

    default:
      return state;
  }
};
