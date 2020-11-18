import * as React from "react";
import "./Spinner.scss";

function Spinner({ className }) {
  return (
    <div className="spinner__wrapper">
      <div className={`spinner ${className ? className : ""}`} />
    </div>
  );
}

export default Spinner;
