import winston from "winston";

const logger = winston.createLogger({
    level: "info", // Log levels: error, warn, info, http, verbose, debug, silly
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json() // Logs in JSON format
    ),
    transports: [
        new winston.transports.Console(), // Logs in console
        new winston.transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors in file
        new winston.transports.File({ filename: "logs/combined.log" }) // Logs all messages
    ]
});

export default logger;
