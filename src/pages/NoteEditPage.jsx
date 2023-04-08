import React, { useEffect, useRef, useState } from "react";
import { currentDate } from "../addition/currentDate";
import { useCallbackPrompt, useInput } from "../addition/customHooks";
import { NoteHOC } from "../components/HOC/NoteHOC";
import { updateNoteBD } from "../store/notes/async";
import ConfirmSaveChanges from "../components/confirmPopUp/ConfirmSaveChanges";
import { Loader } from "../components/loader/Loader";
import BackBTN from "../components/backBTN/BackBTN";
import style from "./../components/notes/Notes.module.scss";

const NoteEditPage = ({
  navigate,
  isLoading,
  dispatch,
  chosenNote: { title, text, id, date },
}) => {
  const [edited, setEdited] = useState(false);
  const [showPrompt, confirmNavigation, cancelNavigation] =
    useCallbackPrompt(edited);
  const titleUI = useInput("", { isEmpty: true, maxLength: 100 });
  const textUI = useInput("", { isEmpty: true });
  const titleEL = useRef(null);
  const textEL = useRef(null);
  const [shake, setShake] = useState(false);
  const titleErr = titleUI.textErr && titleUI.isDirty;
  const textErr = textUI.textErr && textUI.isDirty;
  const disabled = titleUI.textErr || textUI.textErr;

  useEffect(() => {
    titleUI.set(title);
  }, [title]);
  useEffect(() => {
    textUI.set(text);
  }, [text]);

  useEffect(() => {
    resize(titleEL.current);
  }, [titleUI.value, isLoading]);
  useEffect(() => {
    resize(textEL.current);
  }, [textUI.value, isLoading]);

  const updateNoteClick = (e) => {
    e.preventDefault();
    if (disabled) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
      }, 1000);
    } else {
      dispatch(
        updateNoteBD(
          {
            title: titleUI.value.trim(),
            text: textUI.value.trim(),
            id,
            edited: currentDate(),
            date,
          },
          e
        )
      );
      setEdited(false);
    }
  };

  const resize = (e) => {
    if (e) {
      e.style.height = "";
      e.style.height = e.scrollHeight + "px";
    }
  };
  const handleChange = (e) => {
    setEdited(true);
  };
  return (
    <div className={style.noteCardPage}>
      <ConfirmSaveChanges
        visibility={showPrompt}
        confirmNavigation={confirmNavigation}
        cancelNavigation={cancelNavigation}
      />
      <BackBTN navigate={navigate} />
      {isLoading ? (
        <Loader toHeight={60} />
      ) : (
        <form onSubmit={(e) => updateNoteClick(e)} className={style.editing}>
          <textarea
            ref={titleEL}
            id="title"
            {...titleUI.bind}
            onInput={handleChange}
            className={`${titleErr ? style.err : ""}`}
          ></textarea>
          <textarea
            className={`${textErr ? style.err : ""}`}
            onInput={handleChange}
            ref={textEL}
            id="text"
            {...textUI.bind}
          ></textarea>
          <button className={`${shake ? "shake" : ""}`} type="submit">
            <i className="bi bi-clipboard-check-fill"></i>
          </button>
        </form>
      )}
    </div>
  );
};
export default NoteHOC(NoteEditPage);
