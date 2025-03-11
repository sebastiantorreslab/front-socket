import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { Room } from "../../utils/interfaces";
import { MessageRoom } from "./MessageRoom";

interface RoomProps {
  room: Room;
  username: string;
  socket: Socket
}

export const RoomSelected = ({ room, username, socket }: RoomProps) => {
  const [selectedRoom, setSelectedRoom] = useState<Room>(room);
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    setSelectedRoom(room);
  }, [room]);

  useEffect(() => {
    if (socket) {
      socket.on("receiveRoomUsers", (users: string[]) => {
        setUsers(users);
      });

      return () => {
        socket.off("receiveRoomUsers");
      };
    }
  }, [socket]);

  return (
    <div>
      <h2>Room selected {room?.name}</h2>
      <h4>Room Users: {users?.length}</h4>
      <div className="users-room-container">
        <div className="users-room-header">
          {users?.length > 0 &&
            users?.map((user: string, index: number) => (
              <button
                key={index}
                className="user-button"
                style={{
                  backgroundColor: "#ffff",
                  color: "#000",
                  margin: "3px",
                  width: "90px",
                  height: "40px",
                  alignSelf: "left",
                }}
              >
                <span>{user}</span>
              </button>
            ))}
        </div>
      </div>
      <div className="message-room-list-container">
        {<MessageRoom username={username} room={selectedRoom} socket={socket} />}
      </div>
      <br />
      <br />
    </div>
  );
};
