import { ActionTypes } from "../constants/action-types";

export const setPhones = (phones) => {
  return {
    type: ActionTypes.SET_PHONES,
    payload: phones,
  };
};

// export const setSelectedBook = (bookId) => {
//   return {
//     type: ActionTypes.SET_SELECTED_BOOK,
//     bookId,
//   };
// };
