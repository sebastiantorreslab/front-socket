export interface User {
  id: string;
  username: string;
}

export interface UserData {
  user: User;
}

export interface Login {
  email: string;
  password: string;
}

export interface Message {
  from: string;
  to: string;
  message: string;
}

export interface MessageData {
  userId: string;
  text: string;
  timestamp: number;
}

export interface Room {
  id: string;
  name: string;
}
