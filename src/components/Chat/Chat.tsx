import { useState, useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import { UserLogin } from "./UserLogin";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useNavigate } from "react-router-dom";

type Message = {
  from: string;
  to: string;
  message: string;
};

export const Chat = () => {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useSocket();
  const navigate = useNavigate();

  // Efecto para manejar la conexión del socket y los mensajes entrantes
  useEffect(() => {
    if (socket && username) {
      // Enviar el nombre de usuario al servidor
      socket.emit("login", username);

      // Escuchar mensajes entrantes
      socket.on("receiveMessage", (message: Message) => {
        setMessages((prev) => [...prev, message]);
      });

      // Limpiar el listener al desmontar el componente
      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [socket, username]);

  // Función para manejar el inicio de sesión
  const handleLogin = (username: string) => {
    setUsername(username);
  };

  // Función para enviar un mensaje
  const handleSendMessage = (message: Message) => {
    if (socket) {
      socket.emit("sendMessage", message);
      setMessages((prev) => [...prev, message]);
    }
  };

  // Renderizar el formulario de inicio de sesión si no hay un nombre de usuario
  if (!username) {
    return <UserLogin onLogin={handleLogin} />;
  }

  // Renderizar el chat
  return (
    <div>
      <h2>Chat para usuario {username}</h2>
      <button onClick={() => navigate("/rooms", { state: { username } })}>
        Chat Room
      </button>
      <MessageList messages={messages} currentUser={username} />
      <br />
      <MessageInput onSendMessage={handleSendMessage} currentUser={username} />
      <br />
    </div>
  );
};
