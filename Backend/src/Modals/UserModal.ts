import mongoose, { Document, Schema } from "mongoose";
import { IUser } from "../Types/userModalTypes";

const userSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin", "agent"], default: "user" },
    gender: { type: String, enum: ["male", "female"] },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);