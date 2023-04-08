import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchOneNoteFromBD } from "../../store/notes/async";

export const NoteHOC = (Component) => {
  const ComponentUpdate = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const { chosenNote, isLoading } = useSelector(
      (state) => state.notesReducer
    );

    useEffect(() => {
      dispatch(fetchOneNoteFromBD(params.id));
    }, []);

    return (
      <Component
        props={props}
        dispatch={dispatch}
        chosenNote={chosenNote}
        isLoading={isLoading}
        navigate={navigate}
      />
    );
  };
  return ComponentUpdate;
};
