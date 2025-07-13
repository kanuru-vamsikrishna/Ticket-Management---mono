import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Modals/UserModal";

const JWT_SECRET = process.env.JWT_SECRET || "superSecrete";

export const registerNewUser = async (req: Request, res: Response) => {
  console.log(req.body, "reqBody");
  const { username, name, email, password, gender, role } = req.body;

  if (!username || !name || !email || !password || !gender || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPass = await bcryptjs.hash(password, 10);

  const newUser = new User({
    username,
    name,
    email,
    password: hashedPass,
    gender,
    role
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};

export const userLogin = async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  const getUser = await User.findOne({ email: email }) || await User.findOne({username: username });
  if (!getUser) {
    return res.status(404).json({ message: "No user found" });
  }

  const isPasswordMatching = await bcryptjs.compare(password, getUser.password);
  if (!isPasswordMatching) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: getUser._id, role: getUser.role }, JWT_SECRET, {
    expiresIn: "1d"
  })

  res.status(200).json({
    message: "Login Successful",
    token,
    user: {
      id: getUser._id,
      name: getUser.name,
      username: getUser.username,
      email: getUser.email,
      role: getUser.role,
      gender: getUser.gender
    }
  })
}