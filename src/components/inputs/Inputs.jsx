import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { currentDate } from "../../addition/currentDate";
import { useInput, useTouchMove } from "../../addition/customHooks";
import { addNoteBD } from "../../store/notes/async";
import style from "./Inputs.module.scss";

export const Inputs = () => {
  const [shake, setShake] = useState(false);
  const touch = useTouchMove();
  const dispatch = useDispatch();
  const title = useInput("", { isEmpty: true, maxLength: 100 });
  const titleElement = useRef(null);
  const text = useInput("", { isEmpty: true });
  const titleErr = title.textErr && title.isDirty;
  const textErr = text.textErr && text.isDirty;
  const disabled = title.textErr || text.textErr;
  const addNote = (e) => {
    e.preventDefault();
    if (disabled) {
      title.setDirty(true);
      text.setDirty(true);
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    } else {
      titleElement.current.blur();
      dispatch(
        addNoteBD({
          title: title.value.trim(),
          text: text.value.trim(),
          date: currentDate(),
        })
      );
      title.clear();
      text.clear();
      title.setDirty(false);
      text.setDirty(false);
    }
  };
  return (
    <form onSubmit={addNote}>
      <div className={style.input}>
        <p className={`${titleErr ? style.err : ""}`}>{title.textErr}</p>
        <input
          ref={titleElement}
          autoComplete="off"
          id="title"
          {...title.bind}
          type="text"
          className={`${style.title} ${title.value ? style.filled : ""} ${
            titleErr ? style.err : ""
          }`}
        />
        <label className={`${titleErr ? style.err : ""}`} htmlFor="title">
          Title
        </label>
      </div>
      <div className={style.input}>
        <p className={`${textErr ? style.err : ""}`}>{text.textErr}</p>
        <textarea
          autoComplete="off"
          id="text"
          {...text.bind}
          type="text"
          className={`${style.text} ${text.value ? style.filled : ""} ${
            textErr ? style.err : ""
          }`}
        />
        <label className={`${textErr ? style.err : ""}`} htmlFor="text">
          Text
        </label>
      </div>
      <button
        {...touch.bind}
        className={`${style.submit} ${touch.touched ? style.hover : ""} ${
          shake ? "shake" : ""
        } ${disabled ? style.err : ""}`}
        type="submit"
      >
        submit
      </button>
    </form>
  );
};
