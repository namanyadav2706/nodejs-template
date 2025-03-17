import AuthService from "./auth.service.js";
import asyncHandler from "../../../utils/asyncHandler.js";
import ApiResponse from "../../../utils/ApiResponse.js";

export default class AuthController {
    constructor() {
        this.authService = new AuthService();
    }

    logIn = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        const { token, user } = await this.authService.logInUser(email, password);

        // Set Cookie
        res.cookie('user', token, {
            httpOnly: true, sameSite: 'none', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        return res.status(200).json(new ApiResponse(200, { token, user }, "Logged In Successful!"))
    })

    signUp = asyncHandler(async (req, res) => {

        const { token, new_user } = await this.authService.signUpUser(req.body);

        // Set Cookie
        res.cookie('user', token, {
            httpOnly: true, sameSite: 'none', secure: true, maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        })
        return res.status(200).json(new ApiResponse(200, { token, user:new_user }, "Sign In Successful!"))

    })

}