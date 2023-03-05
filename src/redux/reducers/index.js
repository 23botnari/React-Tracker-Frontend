import { combineReducers } from "redux";
import { CompaniesReducer } from "./_companiesReducer";
import { SidePanelReducer } from "./_sidePanelReducer";
import { PhonesReducer } from "./_phonesReducer";
import { SideMenuReducer } from "./_sidemenuReducer";

export const reducers = combineReducers({
  CompaniesReducer,
  SidePanelReducer,
  PhonesReducer,
  SideMenuReducer,
});
