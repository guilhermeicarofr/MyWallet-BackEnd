import bcrypt from 'bcrypt';

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

export { signUp };