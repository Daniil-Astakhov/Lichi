import "./spinners.scss";
import React from "react";

export const Spinner = () => {
  return <div className="data-spinner"></div>;
};
export const ImgLoadSpinner = ({ bottom }) => {
  return (
    <div
      className="img-spinner"
      style={{ bottom: `${bottom}px !important` }}
    ></div>
  );
};
export const LoadingPage = () => {
  return <div className="spinner"></div>;
};
