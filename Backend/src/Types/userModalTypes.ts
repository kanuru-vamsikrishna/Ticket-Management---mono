import { Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin" | "agent",
  gender: "male" | "female"
  created_at?: Date;
  updated_at?: Date;
}