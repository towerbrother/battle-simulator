import React from "react";
import One from "./dice-six-faces-one.png";
import Two from "./dice-six-faces-two.png";
import Three from "./dice-six-faces-three.png";
import Four from "./dice-six-faces-four.png";
import Five from "./dice-six-faces-five.png";
import Six from "./dice-six-faces-six.png";
import "./Dice.css";

const diceList = ["", One, Two, Three, Four, Five, Six];

const Dice = ({ number, name, display }) => {
  return !display ? (
    <img alt="dice" src={diceList[number]} id={name}></img>
  ) : (
    <></>
  );
};

export default Dice;
