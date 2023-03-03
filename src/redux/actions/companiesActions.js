import { ActionTypes } from "../constants/action-types";

export const setCompanies = (companies) => {
  return {
    type: ActionTypes.SET_COMPANIES,
    payload: companies,
  };
};

// export const setSelectedBook = (bookId) => {
//   return {
//     type: ActionTypes.SET_SELECTED_BOOK,
//     bookId,
//   };
// };
