import { ActionTypes } from "../constants/action-types";

const initialState = {
  directionsResponse: null,
  originPoint: "",
  destinationPoint: "",
};

export const DashboardReducer = (state = initialState,  action) => {
  switch (action.type) {
    case ActionTypes.SET_DIRECTIONS_RESPONSE:
      return { ...state, directionsResponse: action.directionsResponse };

    case ActionTypes.SET_ORIGIN_MAP:
      return { ...state, originPoint: action.originPoint };

    case ActionTypes.SET_DESTINATION_MAP:
      return { ...state, destinationPoint: action.destinationPoint };

    default:
      return state;
  }
};
