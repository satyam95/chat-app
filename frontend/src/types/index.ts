export interface OtherUser {
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
