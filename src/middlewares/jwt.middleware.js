import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const jwtAuth = (req, res, next) => {

    try {
        let token = req.cookies.user;

        if (!token && req.headers['authorization']) {
            token = req.headers['authorization'].split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ status: false, message: 'Unauthorized, No token' });
        }

        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = payload.userId
        req.email = payload.email

        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

}

const jwtAccess = (permission) => {
    return (req, res, next) => {
        if (!req.user.permissions.includes(permission)) {
            return res.status(403).json({ message: "Permission denied" });
        }
        next();
    };
};

export { jwtAuth, jwtAccess };