import React from "react";

export const Loader = ({ toHeight = 60 }) => {
  return (
    <div
      style={{ height: window.innerHeight - toHeight }}
      className="loaderWrap"
    >
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
