import { ActionTypes } from "../constants/action-types";


export const setOriginPoint = (originPoint) => {
  return {
    type: ActionTypes.SET_MAP_ORIGIN,
    originPoint,
  };
};
export const setDestinationPoint = (destinationPoint) => {
  return {
    type: ActionTypes.SET_MAP_DESTINATION,
    destinationPoint,
  };
};