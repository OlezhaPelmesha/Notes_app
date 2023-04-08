import axios from "axios";

import { store } from "./../../store";
import {
  addNoteAC,
  deleteNoteAC,
  fetchChosenNoteAC,
  fetchNotesAC,
  loaderHideAC,
  loaderShowAC,
  updateNoteAC,
} from "./notesActions";

const URL =
  "https://notes-b287c-default-rtdb.europe-west1.firebasedatabase.app";

export const addNoteBD = (payload) => {
  return (dispatch) => {
    // dispatch(loaderShowAC());
    axios
      .post(`${URL}/notes.json`, payload)
      .then(({ data }) => {
        payload = { ...payload, id: data.name };
        dispatch(addNoteAC(payload));
      })
      .catch((err) => console.log(err));
    // .finally(() => dispatch(loaderHideAC()));
  };
};

export const deleteNoteBD = (payload, cb, e) => {
  e.stopPropagation();
  e.preventDefault();
  return (dispatch) => {
    //  dispatch(loaderShowAC());
    axios
      .delete(`${URL}/notes/${payload}.json`)
      .then(() => {
        dispatch(deleteNoteAC(payload));
        if (cb) cb("/");
      })
      .catch((err) => console.log(err));
    //.finally(() => dispatch(loaderHideAC()));
  };
};
export const updateNoteBD = (payload) => {
  // e.preventDefault();

  return (dispatch) => {
    dispatch(loaderShowAC());

    axios
      .put(`${URL}/notes/${payload.id}.json`, payload)
      .then(({ data }) => dispatch(updateNoteAC(data)))
      .catch((err) => console.log(err))
      .finally(() => dispatch(loaderHideAC()));
  };
};
export const fetchNotesFromBD = () => {
  return (dispatch) => {
    const notes = store.getState().notesReducer.notes;
    if (notes.length) {
      dispatch(fetchChosenNoteAC(notes));
    } else {
      dispatch(loaderShowAC());
      axios
        .get(`${URL}/notes.json`)
        .then(({ data }) => {
          const payload = Object.keys(data)
            .map((key) => {
              return {
                ...data[key],
                id: key,
              };
            })
            .reverse();
          dispatch(fetchNotesAC(payload));
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(loaderHideAC()));
    }
  };
};
export const fetchOneNoteFromBD = (payload) => {
  return (dispatch) => {
    const notes = store.getState().notesReducer.notes;
    if (notes.length) {
      const [chosenNote] = notes.filter((note) => note.id === payload);
      dispatch(fetchChosenNoteAC(chosenNote));
    } else {
      dispatch(loaderShowAC());
      axios
        .get(`${URL}/notes/${payload}.json`)
        .then(({ data }) => {
          data.id = payload;
          dispatch(fetchChosenNoteAC(data));
        })
        .catch((err) => console.log(err))
        .finally(() => dispatch(loaderHideAC()));
    }
  };
};
