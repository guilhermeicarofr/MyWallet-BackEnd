import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const mongo = await new MongoClient(process.env.MONGO_URI).connect();

const db = mongo.db('mywallet');
console.log('Connected to database');

export { db };