import { MongoClient } from 'mongodb';

const mongo = await new MongoClient(process.env.MONGO_URI).connect();

const db = mongo.db('mywallet');
console.log('Connected to database');

export { db };
