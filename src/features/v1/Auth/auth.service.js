import AuthRepository from "./auth.repository.js";
import UserService from "../Users/user.service.js";
import { BadRequestError, NotFoundError } from "../../../utils/ApiError.js";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

export default class AuthService {
    constructor() {
        this.authRepository = new AuthRepository();
        this.userService = new UserService()
    }

    async logInUser(email, password) {

        const user = await this.userService.findByEmail(email)
        if (!user) throw new NotFoundError("User not found with this email!")

        const result = await bcrypt.compare(password, user.password)
        if (!result) throw new BadRequestError("Wrong Cradentials!")

        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: "USER"
            },
            process.env['JWT_SECRET'],
            {
                expiresIn: "30d"
            }

        )

        return { token, user }
    }

    async signUpUser(userData) {
        const { email } = userData;

        const user = await this.userService.findByEmail(email);
        if (user) throw new BadRequestError("User Already exist with this email!")
            
        userData.password = await bcrypt.hash(userData.password, 12)
        const new_user = await this.userService.createUser(userData);

        const token = jwt.sign(
            {
                userId: new_user._id,
                email: new_user.email,
                role: "USER"
            },
            process.env['JWT_SECRET'],
            {
                expiresIn: "30d"
            }

        )

        return { token, new_user }
    }
}