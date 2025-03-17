import express from "express";
import AuthController from "./auth.controller.js";

const authRouter = express.Router()
const authController = new AuthController();

authRouter.post('/login', authController.logIn)
authRouter.post('/signup', authController.signUp)

export default authRouter