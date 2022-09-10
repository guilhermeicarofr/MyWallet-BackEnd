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

export { createTransaction };