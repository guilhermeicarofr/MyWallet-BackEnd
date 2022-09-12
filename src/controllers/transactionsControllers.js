import { ObjectID } from 'bson';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';

import { db } from '../database/db.js';

dayjs.extend(utc);

async function createTransaction(req,res) {
    const { userId } = res.locals;
    const { title, value, type } = res.locals.transaction;
    const date = dayjs().format('DD/MM/YYYY');

    try {        
        await db.collection('transactions').insertOne({
            title,
            value,
            type,
            userId,
            date
        });

        if(type==='+') {
            const prevBalance = await db.collection('balances').findOne({ userId });
            const newBalance = Number(prevBalance.value) + Number(value);
            await db.collection('balances').updateOne({ userId }, { $set:{ value: newBalance } });
        } else if (type==='-') {
            const prevBalance = await db.collection('balances').findOne({ userId });
            const newBalance = Number(prevBalance.value) - Number(value);
            await db.collection('balances').updateOne({ userId }, { $set:{ value: newBalance } });
        }

        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function readTransactions(req,res) {
    const { userId } = res.locals;

    try {
        const transactions = await db.collection('transactions').find({
            userId: { $eq: userId }
        }).toArray();
        res.send(transactions);
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function deleteTransaction(req,res) {
    const { id } = req.params;
    const { userId } = res.locals;

    try {
        const transaction = await db.collection('transactions').findOne({
            _id: ObjectID(id)
        });
        if(transaction.userId.str !== userId.str) {
            console.log('User not authorized to delete');
            return res.status(403).send('Não autorizado!');    
        }

        await db.collection('transactions').deleteOne({
            _id: ObjectID(id)
        });
        if(transaction.type==='+') {
            const prevBalance = await db.collection('balances').findOne({ userId });
            const newBalance = Number(prevBalance.value) - Number(transaction.value);
            await db.collection('balances').updateOne({ userId }, { $set:{ value: newBalance } });
        } else if (transaction.type==='-') {
            const prevBalance = await db.collection('balances').findOne({ userId });
            const newBalance = Number(prevBalance.value) + Number(transaction.value);
            await db.collection('balances').updateOne({ userId }, { $set:{ value: newBalance } });
        }
        
        res.status(200).send('Transação apagada');
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { createTransaction, readTransactions, deleteTransaction };