import { ActionTypes } from "../constants/action-types";

export const setDirectionsResponse = (directionsResponse) => {
  return {
    type: ActionTypes.SET_DIRECTIONS_RESPONSE,
    directionsResponse,
  };
};
export const setOriginMap = (originMap) => {
  return {
    type: ActionTypes.SET_ORIGIN_MAP,
    originMap,
  };
};
export const setDestinationMap = (destinationMap) => {
  return {
    type: ActionTypes.SET_DESTINATION_MAP,
    destinationMap,
  };
};