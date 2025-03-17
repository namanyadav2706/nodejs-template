import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
// Establish a connection to the database
mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,    // Parse MongoDB connection strings
    useUnifiedTopology: true // Use MongoDB's new connection management engine
});

// Get a reference to the connection
const db = mongoose.connection;

// Handle successful connection
db.once('open', () => {
    console.log("Connected to MongoDB database!");
});

// Handle connection errors
db.on('error', (error) => {
    console.error("Error connecting to MongoDB:", error);
});

export default db;