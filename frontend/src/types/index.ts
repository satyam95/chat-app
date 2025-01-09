export interface User {
  _id: string;
  fullName: string;
  username: string;
  profilePhoto: string;
  gender: "male" | "female" | "other";
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  _id: string;
  username: string;
  fullName: string;
  profilePhoto: string;
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}
