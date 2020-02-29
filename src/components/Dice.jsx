import React from "react";
import "font-awesome/css/font-awesome.min.css";

const diceClass = [
  "",
  "fa fa-dice-one",
  "fa fa-dice-two",
  "fa fa-dice-three",
  "fa fa-dice-four",
  "fa fa-dice-five",
  "fa fa-dice-six"
];

const Dice = ({ number, name }) => {
  return (
    <>
      <i className={diceClass[number]} id={name}></i>
    </>
  );
};

export default Dice;
