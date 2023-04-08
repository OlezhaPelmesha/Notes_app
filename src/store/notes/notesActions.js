export const ADD_NOTE = "ADD_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const FETCH_NOTES = "FETCH_NOTES";
export const FETCH_CHOSEN_NOTE = "FETCH_CHOSEN_NOTE";
export const IS_LOADING_TRUE = "IS_LOADING_TRUE";
export const IS_LOADING_FALSE = "IS_LOADING_FALSE"; //TOGGLE_CONFIRM
export const TOGGLE_CONFIRM = "TOGGLE_CONFIRM";
export const SET_NOTE_TO_REMOVE = "SET_NOTE_TO_REMOVE";

export const addNoteAC = (payload) => ({ type: ADD_NOTE, payload });
export const deleteNoteAC = (payload) => ({ type: DELETE_NOTE, payload });
export const updateNoteAC = (payload) => ({ type: UPDATE_NOTE, payload });
export const fetchNotesAC = (payload) => ({ type: FETCH_NOTES, payload });
export const fetchChosenNoteAC = (payload) => ({
  type: FETCH_CHOSEN_NOTE,
  payload,
});
export const loaderShowAC = (payload) => ({ type: IS_LOADING_TRUE, payload });
export const loaderHideAC = (payload) => ({ type: IS_LOADING_FALSE, payload });
export const toggleConfirmAC = (payload) => ({ type: TOGGLE_CONFIRM, payload });
export const setNoteToRemoveAC = (payload) => ({
  type: SET_NOTE_TO_REMOVE,
  payload,
});
