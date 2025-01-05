export interface Contact {
  createdAt: string;
  fullName: string;
  gender: string;
  profilePhoto: string;
  updatedAt: string;
  username: string;
  _id: string;
}

export interface Message {
  id: string;
  content: string;
  timestamp: string;
  sender: "me" | "them";
}
