import React, { useEffect, useState, useRef } from "react";
import "../css/code.css";
import SmileyFace from "./SmileyFace";
import useSock from "./UseSock";
// import { Controlled as CodeMirror } from "react-codemirror2";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import Highlight from "react-highlight-js";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function Code({ id, isStudent, code, onCodeChange }) {
  const { socket } = useSock();

  //new code of the stident sulotion
  const [newCode, setNewCode] = useState(code.testCode);
  //   const [studentsCode, setStudentsCode] = useState(code.textCode);
  const [isCodeCorrect, setIsCodeCorrect] = useState(false);
  const [isMentorLeft, setIsMentorLeft] = useState(false);
  const [isStudentLeft, setIsStudentLeft] = useState(false);

  socket?.on("newCodeOfStudent", (code) => {
    console.log("new code from student: ", code);
    setNewCode(code);
  });

  socket?.on("mentorLeave", (data) => {
    console.log(data);
    setIsMentorLeft(true);
  });

  socket?.on("studentLeave", (data) => {
    console.log(data);
    setIsStudentLeft(true);
    setNewCode(code.testCode);
  });

  socket?.on("mentorJoin", (data) => {
    console.log(data);
    setIsMentorLeft(false);
  });

  socket?.on("studentJoin", (data) => {
    console.log(data);
    setIsStudentLeft(false);
  });

  //check if the student code is correct

  function handleSubmit() {
    code.correctedCode === newCode
      ? setIsCodeCorrect(true)
      : setIsCodeCorrect(false);
  }
  const handleCodeChange = (event) => {
    const updatedCode = event.target.textContent;
    setNewCode(updatedCode);
    onCodeChange(updatedCode); // Notify the parent component about the change
  };

  return (
    <div>
      <h1>The subject of the lesson is:{code.title}</h1>
      <h2>Hey i am the : {isStudent ? "Student" : "Mentor "}</h2>
      {isCodeCorrect && isStudent && <SmileyFace />}
      <SyntaxHighlighter
        language="javascript" // Replace with the appropriate language
        style={docco}
        onBlur={handleCodeChange}
        // onChange={(value, viewUpdate) => {
        //   onCodeChange(value);
        //   setNewCode(value);
        // }}
        contentEditable={isStudent}
      >
        {newCode}
      </SyntaxHighlighter>

      {isStudent ? <button onClick={handleSubmit}>Save</button> : null}

      {isMentorLeft && <h3>The mentor left the room!</h3>}
      {isStudentLeft && <h3>The student left the room!</h3>}
    </div>
  );
}

export default Code;
