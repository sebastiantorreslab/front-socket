import { useState, useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";

interface User {
  id: string;
  username: string;
}

type Message = {
  from: string;
  to: string;
  message: string;
};

interface MessageListProps {
  onSendMessage: (message: Message) => void;
  currentUser: string;
}

export const MessageInput = ({
  onSendMessage,
  currentUser,
}: MessageListProps) => {
  const [to, setTo] = useState("");
  const [messageText, setMessageText] = useState("");
  const [users, setUsers] = useState([]);
  const socket = useSocket();

  useEffect(() => {
    if (socket && users) {
      socket.emit("getUsers");
      socket.on("receiveUsers", (users) => {
        setUsers(users.filter((user: User) => user.username !== currentUser));
      });

      return () => {
        socket.off("receiveUsers");
      };
    }
  }, [socket, users, currentUser]);

  const handeSend = () => {
    if (to && currentUser && messageText) {
      onSendMessage({ from: currentUser, to, message: messageText });
      setTo("");
      setMessageText("");
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(e.target.value);
  };

  return (
    <div>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="">Selecciona un usuario</option>
        {users.map((user: User) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Escribe tu mensaje"
        value={messageText}
        onChange={handleMessageChange}
      />
      <button onClick={handeSend}>Enviar</button>
    </div>
  );
};
