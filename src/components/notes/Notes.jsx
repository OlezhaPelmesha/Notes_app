import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchNotesFromBD } from "../../store/notes/async";
import { Loader } from "../loader/Loader.jsx";
import Note from "./Note";
import style from "./Notes.module.scss";

export const Notes = () => {
  const { notes, isLoading } = useSelector((state) => state.notesReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotesFromBD());
  }, []);

  return (
    <div className={style.notes}>
      {isLoading ? (
        <Loader toHeight={290} />
      ) : notes.length ? (
        <TransitionGroup component={"div"} className={style.notes}>
          {notes.map((note) => (
            <CSSTransition
              key={note.id}
              classNames="noteAnimation"
              timeout={{ enter: 700, exit: 950 }}
            >
              <Note {...note} />
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <div className={style.empty}>
          <h2>Notes is empty </h2>
        </div>
      )}
    </div>
  );
};
