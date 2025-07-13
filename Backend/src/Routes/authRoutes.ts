import express from "express";
import { registerNewUser, userLogin } from "../Controllers/authController";

const router = express.Router();

router.post("/signup", registerNewUser);
router.post("/login", userLogin);

export default router;