import React from "react";
import { Link } from "react-router-dom";
import "../css/classList.css";
import codeImage from "../images/codeImg.jpg";

const ClassListNavigation = () => {
  const roomsDict = {
    1: "*Closing parenthesis 💯",
    2: "*Components-react 💯",
    3: "*Loop 💯",
    4: "*Object+Array 💯",
  };

  return (
    <div className="classList">
      <ul className="codeList">
        {Object.entries(roomsDict).map(([key, val]) => {
          return (
            <li>
              <Link to={`/code-block-${key}`}>{val}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClassListNavigation;
