import { ActionTypes } from "../constants/action-types";

const initialState = {
  isOpen: false,
  panelType: "",
};

export const SidePanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_OPEN:
      return { ...state, isOpen: action.isOpen };
    case ActionTypes.SET_PANEL_TYPE:
      return { ...state, panelType: action.panelType };
    default:
      return state;
  }
};
