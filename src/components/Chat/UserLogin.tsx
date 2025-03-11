// src/components/Chat/UserLogin.tsx
import { useState } from "react";

interface UserLoginProps {
  onLogin: (username: string) => void;
}

export const UserLogin = ({ onLogin }: UserLoginProps) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim().replace(/\s+/g, "_")) {
      onLogin(username);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar sesión</button>
    </div>
  );
};
