import { db } from '../database/db.js';

async function readUserName(req,res) {
    const { userId } = res.locals;

    try {
        const { name } = await db.collection('users').findOne({ _id: userId });
        res.status(200).send(name);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function readUserBalance(req,res) {
    const { userId } = res.locals;

    try {
        const { value } = await db.collection('balances').findOne({ userId: userId });
        res.status(200).send(String(value));
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { readUserName, readUserBalance };