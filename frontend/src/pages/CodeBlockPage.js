import React, { useEffect, useState } from "react";
import Code from "../components/Code";
import axios from "axios";
import io from "socket.io-client";
import useSock from "../components/UseSock";

const CodeBlockPage = () => {
  const id = window.location.pathname.split("/")[1];
  const [code, setCode] = useState("");
  const { socket } = useSock();

  const [isStudent, setIsStudent] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/code/${id}`)
      .then((response) => {
        console.log("Data fetched: ", response.data);
        setCode(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    // Get data code by id from the server using Axios
    if (!socket) return;
    socket.emit("join", { id: id });

    socket.on("role", ({ isMentor }) => setIsStudent(!isMentor));
    return () => {
      socket?.emit("leave", { id: id });
      console.log("leave");
    };
  }, [socket]);

  ///send the new code
  const onCodeChange = (newCode) => {
    console.log("New code from student: ", newCode);
    if (socket) {
      socket.emit("newCode", { id: id, code: newCode });
    }
  };

  return (
    <div>
      {code !== "" && (
        <Code
          code={code}
          onCodeChange={onCodeChange}
          isStudent={isStudent}
          id={id}
        />
      )}
    </div>
  );
};

export default CodeBlockPage;
