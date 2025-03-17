import express from "express";
import userRouter from "./Users/user.route.js";
import authRouter from "./Auth/auth.route.js";

const router = express.Router();

router.use('/api/v1/users', userRouter);
router.use('/api/v1/auth', authRouter);

export default router;