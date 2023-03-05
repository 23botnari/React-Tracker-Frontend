import { ActionTypes } from "../constants/action-types";

const initialState = {
  isOpen: false,
  panelType: "",
  panelTitle: "",
};

export const SidePanelReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_OPEN:
      return { ...state, isOpen: action.isOpen };
    case ActionTypes.SET_PANEL_TYPE:
      return { ...state, panelType: action.panelType };
    case ActionTypes.SET_PANEL_TITLE:
      return { ...state, panelTitle: action.panelTitle };
    default:
      return state;
  }
};
