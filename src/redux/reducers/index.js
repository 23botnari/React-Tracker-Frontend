import { combineReducers } from "redux";
import { CompaniesReducer } from "./_companiesReducer";
import { SidePanelReducer } from "./_sidePanelReducer";
import { DriversReducer } from "./_driversReducer";
import { SideMenuReducer } from "./_sidemenuReducer";
import { DashboardReducer } from "./_dashboardReducer";

export const reducers = combineReducers({
  CompaniesReducer,
  SidePanelReducer,
  DriversReducer,
  SideMenuReducer,
  DashboardReducer,
});
