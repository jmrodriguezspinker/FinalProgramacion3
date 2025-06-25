import React from "react";
import "./spinner.scss";

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};
