import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';
import morgan from "morgan";
import { client } from "./src/utils/metrics.js"
import helmet from "helmet";
import limiter from "./src/middlewares/rateLimit.middleware.js";
import compression from "compression";
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import logger from "./src/utils/logger.js";
import errorHandler from './src/middlewares/errorHandler.middleware.js';
import db from "./src/config/mongoose.config.js";

import router from "./src/features/v1/route.js";

dotenv.config()

const PORT = process.env.PORT || 2700

const app = express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: ['http://192.168.101.21:5173', 'http://localhost:5173'],
    credentials: true
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Log all HTTP requests
app.use(morgan("combined", { stream: { write: (message) => logger.info(message.trim()) } }));
app.use(helmet()); // Adds security headers to all responses
app.use(limiter);
app.use(compression());

app.use(router)

app.get('/', (req, res) => {
    res.send("Hello World!")
})

app.get("/metrics", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
});

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`App is listening to the port: ${PORT}`);
})