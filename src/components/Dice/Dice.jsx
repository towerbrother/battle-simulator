import React from "react";

const diceList = [
  "",
  "dice-six-faces-one",
  "dice-six-faces-two",
  "dice-six-faces-three",
  "dice-six-faces-four",
  "dice-six-faces-five",
  "dice-six-faces-six"
];

const Dice = ({ number, name }) => {
  return (
    <>
      <img
        alt="dice"
        src={`https://game-icons.net/icons/ffffff/000000/1x1/delapouite/${diceList[number]}.svg`}
      ></img>
    </>
  );
};

export default Dice;
