
import { ActionTypes } from "../constants/action-types";

const initialState = {
  isExpanded: true,
};

export const SideMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_EXPANDED:
        return { ...state, isExpanded: action.isExpanded };
    default:
      return state;
  }
};
