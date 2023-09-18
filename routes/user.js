import express from "express";
import { getUserProfile, login, logout, register } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/logout',isAuthenticated, logout);

router.get('/userid/user',isAuthenticated, getUserProfile);

export default router;