import { io } from "socket.io-client";

let socket;

export function getSocket() {
  if (!socket) {
    socket = io("http://localhost:3000", {
      // optional: force new connection only once
      autoConnect: true,
    });
  }
  return socket;
}
