import { ActionTypes } from "../constants/action-types";

const initialState = {
  originPoint: "",
  destinationPoint: "",
};

export const DashboardReducer = (state = initialState,  action) => {
  switch (action.type) {

    case ActionTypes.SET_MAP_ORIGIN:
      return { ...state, originPoint: action.originPoint };

    case ActionTypes.SET_MAP_DESTINATION:
      return { ...state, destinationPoint: action.destinationPoint };

    default:
      return state;
  }
};
