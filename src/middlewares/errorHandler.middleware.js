import { ApiErrors } from "../utils/ApiError.js";
import logger from "../utils/logger.js";


const errorHandler = (err, req, res, next) => {
    console.error(`Error: ${err}`);
    logger.error(err)
        
    // If it's an instance of ApiError, return the structured response
    if (err instanceof ApiErrors) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            success: false,
            message: err.message || "Something Went Wrong",
            errors: err.errors || null
        });
    }

    // Handle Mongoose Validation Errors
    if (err.name === "ValidationError") {
        return res.status(400).json({
            statusCode: err.statusCode,
            success: false,
            message: "Validation failed",
            errors: Object.values(err.errors).map(e => e.message)
        });
    }

    // Handle Mongoose CastError (Invalid ObjectId)
    if (err.name === "CastError") {
        return res.status(400).json({
            statusCode: err.statusCode,
            success: false,
            message: "Invalid ID format",
            errors: [{ field: err.path, issue: "Invalid MongoDB ObjectId" }]
        });
    }

    // Handle MongoDB Duplicate Key Error
    if (err.code === 11000) {
        return res.status(409).json({
            statusCode: err.statusCode,
            success: false,
            message: "Duplicate key error",
            errors: Object.keys(err.keyValue).map(field => ({
                field,
                issue: `Duplicate value for ${field}`
            }))
        });
    }

    // Handle Syntax Errors (Invalid JSON)
    if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
        return res.status(400).json({
            statusCode: err.statusCode,
            success: false,
            message: "Invalid JSON format",
        });
    }

    // Catch-all for unexpected errors
    return res.status(500).json({
        statusCode: err.statusCode || 500,
        success: false,
        message: "Internal Server Error",
    });
};

export default errorHandler;
