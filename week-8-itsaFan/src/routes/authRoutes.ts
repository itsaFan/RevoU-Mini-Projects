import express from "express";
import { getAllUsers, login } from "../controllers/authController";

const router = express.Router();

// router.get("/", getAllUsers);
router.post("/login", login);

export default router;
