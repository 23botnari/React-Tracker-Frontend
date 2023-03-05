import { ActionTypes } from "../constants/action-types";

export const setIsExpanded = (isExpanded) => {
  return {
    type: ActionTypes.SET_IS_EXPANDED,
    isExpanded,
  };
};



