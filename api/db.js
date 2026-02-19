import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
    if (cachedDb) return cachedDb;

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('slicehub');

    cachedClient = client;
    cachedDb = db;
    return db;
}
