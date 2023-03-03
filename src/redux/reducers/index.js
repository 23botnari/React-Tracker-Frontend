import { combineReducers } from "redux";
import { CompaniesReducer } from "./_companiesReducer";
import { SidePanelReducer } from "./_sidePanelReducer";
import { PhonesReducer } from "./_phonesReducer";

export const reducers = combineReducers({
  CompaniesReducer,
  SidePanelReducer,
  PhonesReducer,
});
