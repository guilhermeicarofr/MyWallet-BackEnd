import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { db } from '../database/db.js';

async function signUp(req,res) {
    const { name, email, password } = res.locals?.newUser;
    
    try {
        const { insertedId } = await db.collection('users').insertOne({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        });
        
        await db.collection('balances').insertOne({
            value: 0,
            userId: insertedId
        });
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);
    }
}

async function signIn(req,res) {
    const { userId } = res.locals;
    const token = uuid();

    try {
        await db.collection('sessions').insertOne({
            token,
            userId
        });

        res.status(200).send(token);
    } catch (error) {
        res.sendStatus(500);
        console.log(error);    
    }
}

export { signUp, signIn };