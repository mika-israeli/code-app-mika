import { useContext } from "react";
// import { SocketContext } from "./SocketContexASFDSADGHFSSDTGKJNM
import { SocketContext } from "./SocketProvider";

const useSock = () => {
  return useContext(SocketContext);
};

export default useSock;
