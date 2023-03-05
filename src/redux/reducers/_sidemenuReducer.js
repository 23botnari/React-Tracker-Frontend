
import { ActionTypes } from "../constants/action-types";

const initialState = {
  isExpanded: false,
};

export const SideMenuReducer = (state = initialState, action) => {
  switch (action) {
    case ActionTypes.SET_IS_EXPANDED:
        return { ...state, isExpanded: action.isExpanded };
    default:
      return state;
  }
};
