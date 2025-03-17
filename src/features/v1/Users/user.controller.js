import UserService from "./user.service.js";
import userSchema from "../../../validations/user.validation.js";
import ApiResponse from "../../../utils/ApiResponse.js";
import asyncHandler from "../../../utils/asyncHandler.js";

export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    fetchSingleUser = asyncHandler(async (req, res) => {
        const userId = req.params['id'];
        const user = await this.userService.fetchSingleUser(userId);
        return res.json(new ApiResponse(201, user, "User Fetch Success"))
    })

    fetchAllUsers = asyncHandler(async (req, res) => {
        const query_params = req.query;
        const result = await this.userService.fetchAllUsers(query_params);
        return res.status(200).json(new ApiResponse(200, result))
    })

    createUser = asyncHandler(async (req, res) => {
        if (req.file) {
            req.body.image = "images/" + req.file.filename;
        }

        const user = req.body;
        const result = await this.userService.createUser(user);
        return res.status(201).json(new ApiResponse(201, result))
    })

    updateUser = asyncHandler(async (req, res) => {
        if (req.file) {
            req.body.image = "images/" + req.file.filename;
        }

        const userId = req.params['id'];
        const new_user = req.body;

        const result = await this.userService.updateUser(userId, new_user);
        return res.status(200).json(new ApiResponse(200, result, "Update Success"))
    })

    removeUser = asyncHandler(async (req, res) => {
        const userId = req.params['id'];
        const result = await this.userService.removeUser(userId);
        return res.status(200).json(new ApiResponse(200, result, "Delete Success"))
    })
}