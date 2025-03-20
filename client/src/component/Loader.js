import React from "react";
import "./loader.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="loader-letter">H</div>
        <div className="loader-letter">O</div>
        <div className="loader-letter">M</div>
        <div className="loader-letter">E</div>
        <div className="loader-letter">D</div>
        <div className="loader-letter">E</div>
        <div className="loader-letter">C</div>
        <div className="loader-letter">O</div>
        <div className="loader-letter">R</div>
        <div className="loader-letter">!</div>
      </div>
      <div className="subtext">Loading your favorites...</div>
    </div>
  );
}

export default Loader;
