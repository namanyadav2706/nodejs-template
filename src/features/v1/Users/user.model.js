import mongoose from "mongoose";

const user = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

const UserModel = mongoose.model('Users', user)
export default UserModel;