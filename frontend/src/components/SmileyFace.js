import React from "react";
import smileyHappy from "../images/smiley-happy.png";
import smileySad from "../images/sadSmiley.jpeg";

const SmileyFace = () => {
  //style the img tag

  return (
    <div>
      <img
        src={smileyHappy}
        alt="Smiley Face"
        style={{
          width: "50%",
          height: "10%",
          marginLeft: "25%",
          marginRight: "25%",
        }}
      />
      <p
        style={{
          textAlign: "center",
          fontSize: "40px",
          color: "blue",
        }}
      >
        good job!
      </p>
    </div>
  );
};

export default SmileyFace;
