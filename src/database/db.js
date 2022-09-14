import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const mongo = await new MongoClient(MONGO_URI).connect();

const db = mongo.db('mywallet');
console.log('Connected to database');

export { db };