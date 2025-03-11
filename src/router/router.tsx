import { Routes, Route } from "react-router-dom";
import { Chat } from "../components/Chat/Chat";
import { ChatRoom } from "../components/ChatRoom/ChatRoom";

export const AppRouter = () => {
  return (
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/rooms" element={<ChatRoom />} />
      </Routes>
  );
};
