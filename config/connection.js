const { MongoClient } = require('mongodb');
require('dotenv').config();

// Ensure DB_URL is set in your environment variables
const url = process.env.DB_URL; 
const client = new MongoClient(url);

const dbName = "eCommerce";

const state = {
    db: null, // Holds the database instance
};

const connect = async () => {
    if (state.db) {
        console.log("Database is already connected.");
        return state.db;
    }

    try {
        await client.connect();
        state.db = client.db(dbName); // Save the database instance
        console.log("Database connected successfully.");
        return state.db;
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
};

const getDb = () => {
    if (!state.db) {
        throw new Error("Database is not connected. Please call connect() first.");
    }
    return state.db;
};

module.exports = { connect, getDb };
