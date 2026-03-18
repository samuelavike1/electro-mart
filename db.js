require('dotenv').config();
const uri = process.env.MONGO_URI;
const { MongoClient, ServerApiVersion } = require('mongodb');


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbName = process.env.MONGO_DB_NAME;
let dbInstance = null;

if (!uri) throw new Error('MONGO_URI is not defined in environment variables');
if (!dbName) throw new Error('MONGO_DB_NAME is not defined in environment variables');


async function db_init() {
    if (dbInstance) {
        return dbInstance;
    }
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        dbInstance = client.db(dbName);
        return dbInstance;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

async function closeDb() {
    if (client) {
        await client.close();
        dbInstance = null;
        console.log('MongoDB connection closed gracefully.');
    }
}

process.on('SIGINT', async () => { await closeDb(); process.exit(0); });
process.on('SIGTERM', async () => { await closeDb(); process.exit(0); });

module.exports = { db_init, closeDb };
