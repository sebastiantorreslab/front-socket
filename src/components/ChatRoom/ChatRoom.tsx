import { useState, useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import { Room } from "../../utils/interfaces";
import { useNavigate, useLocation } from "react-router-dom";
import { RoomSelected } from "./RoomSelected";

export const ChatRoom = () => {
  const [room, setRoom] = useState<Room>({ id: "", name: "" });
  const [rooms, setRooms] = useState<string[]>([]);

  const location = useLocation();
  const { username } = location.state || {};

  const socket = useSocket();
  const navigate = useNavigate();

  const handleJoinRoom = () => {
    if (socket) {
      socket.emit("joinRoom", username, room, () => socket.emit("getRooms"));
    }
  };

  const handleLeaveRoom = () => {
    if (socket) {
      socket.emit("leaveRoom", username, room, () => socket.emit("getRooms"));
    }
  };

  const handleChangeRoomName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ id: e.target.value, name: e.target.value });
  };

  useEffect(() => {
    if (socket) {
      socket.emit("getRooms");

      socket.on("receiveRooms", (rooms: string[]) => {
        setRooms(rooms);
      });

      return () => {
        if (socket) {
          socket.off("receiveRooms");
        }
      };
    }
  }, [socket, room]);

  return (
    <div className="chat-room">
      <h2>Chat Room</h2>
      <h4>User: {username}</h4>
      <div className="chat-room-container">
        <div className="chat-room-header">
          <div className="chat-room-header-left">
            {rooms.length > 0 &&
              rooms?.map((room: string, index: number) => (
                <button
                  key={index}
                  className="room-button"
                  style={{
                    backgroundColor: "#ffff",
                    color: "#000",
                    margin: "3px",
                    width: "90px",
                    height: "40px",
                    alignSelf: "center",
                  }}
                  onClick={() =>
                    setRoom({
                      id: room.trim(),
                      name: room.trim(),
                    })
                  }
                >
                  <span>{room}</span>
                </button>
              ))}
            <div />
            <div className="chat-room-header-right">
              <input
                type="text"
                placeholder="Enter Room Name"
                value={room.id}
                onChange={handleChangeRoomName}
              />
              <button onClick={handleJoinRoom}>Join Room</button>
              <button onClick={handleLeaveRoom}>Leave Room</button>
            </div>
            <div className="room-container"></div>
          </div>
          <button onClick={() => navigate("/")}>Chats</button>
        </div>

        <div className="room-container">
          {room?.id !== undefined && socket && (
            <RoomSelected room={room} username={username} socket={socket} />
          )}
        </div>
      </div>
    </div>
  );
};
