import React from "react";
import Dice from "../Dice/Dice";
import Health from "../Health/Health";
import "./Players.css";

const Players = ({ name, icon, health, dice, start }) => {
  return (
    <div id="wrapper" className={`${name}-container`}>
      <i className={icon}></i>
      <Health name={name} value={health} />
      <div className="dice-wrapper">
        {dice.map((number, name) => (
          <Dice
            key={`player-${name}`}
            number={number}
            name={`player-${name}`}
            display={start}
          />
        ))}
      </div>
    </div>
  );
};

export default Players;
