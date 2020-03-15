import React from "react";
import "./Health.css";

const HealthPoints = ({ name, value }) => {
  return (
    <div className={name}>
      <label htmlFor="health-points">{name}:</label>
      <progress id={`health-points-${name}`} max="100" value={value}></progress>
    </div>
  );
};

export default HealthPoints;
