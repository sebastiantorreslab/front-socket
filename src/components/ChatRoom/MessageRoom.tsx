import { useCallback, useEffect, useRef, useState } from "react";
import { MessageData, Room } from "../../utils/interfaces";
import { Socket } from "socket.io-client";

interface MessageRoomProps {
  username: string;
  room: Room;
  socket: Socket;
}

export const MessageRoom = ({ username, room, socket }: MessageRoomProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messageText, setMessageText] = useState("");
  const [messageList, setMessageList] = useState<Record<string, MessageData[]>>(
    {}
  );

  const handleSendMessage = useCallback(() => {
    if (!socket || !messageText.trim() || !room?.id) {
      console.error("Socket no disponible, mensaje vacío o sala no válida");
      return;
    }

    const messageData: MessageData = {
      userId: username.trim(),
      text: messageText.trim(),
      timestamp: new Date().getTime(),
    };

    socket.emit(
      "sendMessageToRoom",
      messageData,
      room.id,
      (response: { success: boolean; error?: string }) => {
        if (!response.success) {
          console.error("Error al enviar el mensaje:", response.error);
        }
      }
    );

    setMessageText("");
  }, [socket, messageText, room, username]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message: MessageData) => {
      setMessageList((prev) => {
        const newList = { ...prev };
        newList[room.id] = [...(newList[room.id] || []), message];
        return newList;
      });
    };

    socket.on("receiveMessageRoom", handleReceiveMessage);

    return () => {
      socket.off("receiveMessageRoom", handleReceiveMessage);
    };
  }, [socket, room.id]);

  useEffect(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }, [messageList, room.id]);

  return (
    <div className="message-room-list">
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        {/* Filtra y muestra solo los mensajes de la sala actual */}
        {messageList[room.id]?.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.userId === username ? "left" : "right",
              color: msg.userId === username ? "#007bff" : "#6c757d",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <strong>{msg.userId}:</strong>
            <span style={{ fontSize: "0.8em", color: "#6c757d" }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
            <br />
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="message-room-input">
        <input
          type="text"
          placeholder="Escribe tu mensaje"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
};
