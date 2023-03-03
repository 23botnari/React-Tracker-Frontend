import { ActionTypes } from "../constants/action-types";

export const setIsOpen = (isOpen) => {
  return {
    type: ActionTypes.SET_IS_OPEN,
    isOpen,
  };
};

export const setPanelType = (panelType) => {
  return {
    type: ActionTypes.SET_PANEL_TYPE,
    panelType,
  };
};
