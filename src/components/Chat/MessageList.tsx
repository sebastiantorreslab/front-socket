import { useEffect, useRef } from "react";

// Definir tipos para los mensajes
type Message = {
  from: string;
  to: string;
  message: string;
};

// Props del componente
interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export const MessageList = ({ messages, currentUser }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const time = new Date().toLocaleTimeString();

  // Efecto para hacer scroll al final de la lista de mensajes
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      style={{
        height: "300px",
        overflowY: "scroll",
        border: "1px solid #ccc",
        padding: "10px",
      }}
    >
      {messages.map((msg, index) => {
        return (
          <div
            key={index}
            style={{
              textAlign: msg.from === currentUser ? "left" : "right",
              color: msg.from === currentUser ? "#007bff" : "#6c757d",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ccc",
            }}
          >
            <strong>{msg.from}:</strong>
            <span style={{ fontSize: "0.8em", color: "#6c757d" }}>{time}</span>
            <br />
            {msg.message}
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};
