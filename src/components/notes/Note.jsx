import React, { memo, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTouchMove } from "../../addition/customHooks";
import {
  setNoteToRemoveAC,
  toggleConfirmAC,
} from "../../store/notes/notesActions";
import style from "./Notes.module.scss";

export default memo(({ title, text, date, id, edited }) => {
  const dispatch = useDispatch();
  const touch = useTouchMove();
  const popUp = useRef(null);
  const navigate = useNavigate();
  const showPopUp = () => {
    popUp.current.classList.add("active");
  };
  const goToItemNotePage = (e, id) => {
    if (
      !e.target.classList.contains("popup_opener") &&
      !e.target.closest(".popup_opener")
    )
      navigate(`/note/${id}`);
  };
  const goToEditNotePage = (e, id) => {
    e.stopPropagation();
    navigate(`/note/edit/${id}`);
  };
  const removeNote = (e) => {
    e.stopPropagation();
    dispatch(setNoteToRemoveAC({ title, id }));
    dispatch(toggleConfirmAC(true));
  };
  return (
    <div
      {...touch.bind}
      onClick={(e) => goToItemNotePage(e, id)}
      className={`${style.noteCard} ${touch.touched ? style.hover : ""}`}
    >
      <div onClick={showPopUp} className={`${style.options} popup_opener`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div ref={popUp} className={`${style.optionsMenu} popup`}>
        <div onClick={(e) => goToEditNotePage(e, id)}>
          <span>Edit</span> <i className="bi bi-pencil-square"></i>
        </div>
        <div onClick={removeNote}>
          <span>Delete</span> <i className="bi bi-trash3"></i>
        </div>
      </div>
      <h3 className={style.noteTitle}>{title}</h3>
      <p className={style.text}>{text}</p>
      <div className={style.hr}></div>
      <div className={style.date}>
        <span>{" " + date}</span>
        <span> {(edited ? `last edited: ${edited}` : "").trim()}</span>
      </div>
    </div>
  );
});
