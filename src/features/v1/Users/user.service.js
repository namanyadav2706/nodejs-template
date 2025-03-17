import UserRepository from "./user.repository.js";
import { NotFoundError } from "../../../utils/ApiError.js";

export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async fetchSingleUser(id) {
        const result = await this.userRepository.getSingleUser(id);
        if (!result) throw new NotFoundError("User not found")
        return result;
    }

    async fetchAllUsers(query_params) {
        let { limit, page, search } = query_params;
        if (!limit) {
            limit = 9;
        }

        if (!page) {
            page = 1;
        }

        const skip = (page - 1) * limit;
        let query = {};

        if (search) {
            query.$or = [
                { email: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } },
                // Add other fields to search if needed
            ];
        }


        const [result, totalItems] = await this.userRepository.getAllUsers(skip, limit, query);
        const totalPages = Math.ceil(totalItems / limit);

        const response = {
            result,
            totalPages,
            currentPage: parseInt(page),
            limit: result.length

        }
        return response;
    }

    async createUser(user) {
        return await this.userRepository.postUser(user);
    }

    async updateUser(id, updateData) {
        const result = await this.userRepository.patchUser(id, updateData);
        if (!result) throw new NotFoundError("User not found")
        return result;
    }

    async removeUser(id) {
        const result = await this.userRepository.deleteUser(id);
        if (!result) throw new NotFoundError("User not found")
        return result;
    }

    async findByEmail(email) {
        return await this.userRepository.findByEmail(email);
    }
}