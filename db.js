require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME;

if (!uri) throw new Error('MONGO_URI is not defined in environment variables');
if (!dbName) throw new Error('MONGO_DB_NAME is not defined in environment variables');

let isConnected = false;

async function db_init() {
    if (isConnected) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(uri, {
            dbName
        });

        isConnected = true;
        console.log('Connected to MongoDB with Mongoose');
        return mongoose.connection;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

async function closeDb() {
    if (isConnected) {
        await mongoose.connection.close();
        isConnected = false;
        console.log('MongoDB connection closed gracefully.');
    }
}

process.on('SIGINT', async () => { await closeDb(); process.exit(0); });
process.on('SIGTERM', async () => { await closeDb(); process.exit(0); });

module.exports = { db_init, closeDb };