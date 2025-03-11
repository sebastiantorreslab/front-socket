import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3002";

let socket: Socket;

export const connectSocket = () => {
  socket = io(SOCKET_URL);
  socket.on("connect", () => {
    console.log("Connected to socket server");
  });
};

export const getSocket = () => {
  return socket;
};

export const disconnectSocket = () => {
  socket.disconnect();
};
