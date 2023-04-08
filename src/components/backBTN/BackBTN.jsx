import React, { memo } from "react";
import style from "./../notes/Notes.module.scss";
export default memo(({ navigate }) => {
  return (
    <button className={style.backToAllNotes} onClick={() => navigate(`/`)}>
      <i className="bi bi-arrow-left"></i> <span> All notes</span>
    </button>
  );
});
