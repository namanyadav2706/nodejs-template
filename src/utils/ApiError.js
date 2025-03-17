export class ApiErrors extends Error {
    constructor(statusCode, message = "Something went Wrong", errors = []) {
        super(message);
        this.statusCode = statusCode;
        this.errors = errors;
        this.success = false;
        this.message = message;

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export class BadRequestError extends ApiErrors {
    constructor(message = "Bad Request", errors = []) {
        super(400, message, errors);
    }
}

export class NotFoundError extends ApiErrors {
    constructor(message = "Resource not found") {
        super(404, message);
    }
}

export class UnauthorizedError extends ApiErrors {
    constructor(message = "Unauthorized access") {
        super(401, message);
    }
}

export class ForbiddenError extends ApiErrors {
    constructor(message = "Access forbidden") {
        super(403, message);
    }
}

export class ConflictError extends ApiErrors {
    constructor(message = "Conflict error", errors = []) {
        super(409, message, errors);
    }
}

export class DatabaseError extends ApiErrors {
    constructor(message = "Database error", errors = []) {
        super(500, message, errors);
    }
}

export class InternalServerError extends ApiErrors {
    constructor(message = "Internal Server Error") {
        super(500, message);
    }
}