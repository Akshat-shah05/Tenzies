import React from "react";
import "./dice.css";

const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#84ed72" : "white",
  };

  return (
    <div 
      className="dice-face" 
      style={styles} 
      onClick={props.holdDice}
    >
      <h2> {props.value} </h2>
    </div>
  );
};

export default Dice;
