const { MongoClient } = require('mongodb');
require('dotenv').config()

const url = process.env.DB_URL; // Ensure DB_URL is set in your environment variables
const client = new MongoClient(url,);

const dbName = "eCommerce";

const state = {
    db: null,
};

const connect = async (done) => {
    try {
        await client.connect();
        console.log("Connected successfully to server");
        state.db = client.db(dbName); // Store the database instance in the state object
        done(null); // Call the done callback with no error
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        done(err); // Pass the error to the callback
    }
};

const getDb = () => {
    if (!state.db) {
        throw new Error("Database is not connected. Please call connect() first.");
    }
    return state.db;
};

module.exports = {
    connect,
    getDb,
};
