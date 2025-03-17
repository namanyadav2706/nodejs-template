import UserModel from "./user.model.js";
import { BadRequestError, NotFoundError, DatabaseError, ConflictError } from "../../../utils/ApiError.js";

export default class UserRepository {

    async getSingleUser(id) {
        try {
            const data = await UserModel.findById(id);
            return data;
        } catch (error) {
            if (error.name === "CastError") {
                throw new BadRequestError("Invalid ID format", [{ field: "id", issue: "Invalid MongoDB ObjectId" }]);
            }
            throw new DatabaseError("Failed to fetch blog", [error.message]);
        }
    }

    async getAllUsers(skip, limit, query) {
        try {
            const data = await User.find(query).skip(skip).limit(limit);
            const totalItems = await UserModel.countDocuments(query);
            return [data, totalItems];
        } catch (error) {
            throw new DatabaseError("Failed to fetch users", [error.message]);
        }
    }

    async postUser(user) {
        try {
            const data = await UserModel.create(user);
            return data;
        } catch (error) {
            if (error.name === "ValidationError") {
                throw new BadRequestError("Invalid User data", Object.values(error.errors).map(e => e.message));
            }
            if (error.code === 11000) {
                throw new ConflictError("Duplicate key error", Object.keys(error.keyValue).map(field => ({
                    field,
                    issue: `Duplicate value for ${field}`
                })));
            }
            throw new DatabaseError("Failed to create user", [error.message]);
        }
    }

    async patchUser(id, user) {
        try {
            const data = await UserModel.findByIdAndUpdate(id, user, { new: true, runValidators: true });
            return data;
        } catch (error) {
            if (error.name === "ValidationError") {
                throw new BadRequestError("Invalid user data", Object.values(error.errors).map(e => e.message));
            }
            if (error.name === "CastError") {
                throw new BadRequestError("Invalid ID format", [{ field: "id", issue: "Invalid MongoDB ObjectId" }]);
            }
            throw new DatabaseError("Failed to update user", [error.message]);
        }
    }

    async deleteUser(id) {
        try {
            const data = await UserModel.findByIdAndDelete(id);
            return data;
        } catch (error) {
            if (error.name === "CastError") {
                throw new BadRequestError("Invalid ID format", [{ field: "id", issue: "Invalid MongoDB ObjectId" }]);
            }
            throw new DatabaseError("Failed to delete user", [error.message]);
        }
    }

    async findByEmail(email) {
        try {
            const data = await UserModel.findOne({ email });
            return data;
        } catch (error) {
            throw new DatabaseError("Failed to fetch user", [error.message]);
        }
    }
}