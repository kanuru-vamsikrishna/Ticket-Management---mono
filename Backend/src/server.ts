import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./Routes/authRoutes";

// Loading the environment variables.
dotenv.config();

// Initializing the express app.
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5173;
const MONGO_URI = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URI).then(() => {
  console.log("MongoDB connected successfully");
  app.listen(PORT, () => {
    console.log("Server running on Port", PORT)
  })
}).catch((error: any) => {
  console.log("Failed to connect MongoDB", error.message)
});

// User routes
app.use("/api/v1/auth", authRoutes);