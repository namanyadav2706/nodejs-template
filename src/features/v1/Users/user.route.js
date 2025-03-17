import express from "express"
import UserController from "./user.controller.js"
import { jwtAuth, jwtAccess } from "../../../middlewares/jwt.middleware.js";
import { uploadFile } from "../../../middlewares/upload.middleware.js";

const userRouter = express.Router()
const userController = new UserController();

userRouter.get('/:id', userController.fetchSingleUser)
userRouter.get('/', jwtAuth, userController.fetchAllUsers)
//userRouter.post('/', userController.createUser)
userRouter.patch('/:id', uploadFile.single('image'), userController.updateUser)
userRouter.delete('/:id', jwtAuth, userController.removeUser)

export default userRouter;