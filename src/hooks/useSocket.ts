import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3002";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL); // Crear una nueva instancia de Socket
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect(); // Desconectar el socket al desmontar el componente
    };
  }, []);

  return socket;
};
