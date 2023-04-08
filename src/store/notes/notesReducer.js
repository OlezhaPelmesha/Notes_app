import {
  ADD_NOTE,
  DELETE_NOTE,
  FETCH_CHOSEN_NOTE,
  FETCH_NOTES,
  IS_LOADING_FALSE,
  IS_LOADING_TRUE,
  SET_NOTE_TO_REMOVE,
  TOGGLE_CONFIRM,
  UPDATE_NOTE,
} from "./notesActions";

const initialState = {
  notes: [],
  isLoading: false,
  chosenNote: {},
  showConfirmPopUp: false,
  noteToRemove: {},
};

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return { ...state, notes: [action.payload, ...state.notes] };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case FETCH_NOTES:
      return { ...state, notes: [...action.payload] };
    case FETCH_CHOSEN_NOTE:
      return { ...state, chosenNote: action.payload };
    case IS_LOADING_TRUE:
      return { ...state, isLoading: true };
    case IS_LOADING_FALSE:
      return { ...state, isLoading: false };
    case TOGGLE_CONFIRM:
      return { ...state, showConfirmPopUp: !!action.payload };
    case SET_NOTE_TO_REMOVE:
      return { ...state, noteToRemove: { ...action.payload } };
    default:
      return state;
  }
};
