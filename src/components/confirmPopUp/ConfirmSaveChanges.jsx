import React, { memo } from "react";
import { CSSTransition } from "react-transition-group";
import { useTouchMove } from "../../addition/customHooks";
import style from "./Confirm.module.scss";
export default memo(({ confirmNavigation, cancelNavigation, visibility }) => {
  const touch = useTouchMove();

  return (
    <CSSTransition
      in={visibility}
      timeout={{ enter: 500, exit: 250 }}
      classNames={"popupConfirmAnim"}
      mountOnEnter
      unmountOnExit
    >
      <div className={style.confirmWrap}>
        <div className={`${style.container} `}>
          <h2>You have unsaved changes, do you want continue?</h2>
          <div className={style.buttons}>
            <button
              {...touch.bind}
              onClick={confirmNavigation}
              className={`${style.do} ${touch.touched ? style.hover : ""}`}
            >
              Yes
            </button>
            <button
              {...touch.bind}
              onClick={cancelNavigation}
              className={`${style.cancel} ${touch.touched ? style.hover : ""}`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
});
