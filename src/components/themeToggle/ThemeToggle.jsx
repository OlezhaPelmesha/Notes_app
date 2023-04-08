import React, { memo } from "react";
import { useTheme } from "../../addition/customHooks";
import style from "./ToggleTheme.module.scss";

export default memo(() => {
  const { theme, setTheme } = useTheme();

  const setLightThemeClick = () => {
    setTheme("light");
  };
  const setLightDarkClick = () => {
    setTheme("dark");
  };
  return (
    <div className={`${style.togglerTheme}`}>
      <div className={style.switchField}>
        <input
          checked={theme === "light"}
          type="radio"
          id="radio-one"
          name="themeChanger"
          value="dark"
        />
        <label onClick={setLightThemeClick} htmlFor="radio-one">
          <i className={`bi bi-moon-fill ${style.moon}`}></i>
        </label>
        <input
          checked={theme === "dark"}
          type="radio"
          id="radio-two"
          name="themeChanger"
          value="light"
        />
        <label onClick={setLightDarkClick} htmlFor="radio-two">
          <i className={`bi bi-sun-fill ${style.sun}`}></i>
        </label>
      </div>
    </div>
  );
});
