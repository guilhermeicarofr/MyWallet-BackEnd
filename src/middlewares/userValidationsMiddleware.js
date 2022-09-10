import bcrypt from 'bcrypt';

import { signUpSchema, signInSchema } from '../schemas/userSchemas.js';
import { db } from '../database/db.js';

async function signUpValidation(req,res,next) {
    const user = req.body;

    const inputValidation = signUpSchema.validate(user, { abortEarly: false });
    if(inputValidation.error) {
        console.log(inputValidation.error.details);
        return res.status(422).send(inputValidation.error.details.map((item)=>item.message));
    }

    try {
        const checkuser = await db.collection('users').findOne({ email: user.email });
        if(checkuser) {
            console.log('Email already on database');
            return res.status(409).send('You already have an account!');
        }
        
        res.locals.newUser = user;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function signInValidation(req,res,next) {
    const user = req.body;

    const inputValidation = signInSchema.validate(user, { abortEarly: false });
    if(inputValidation.error) {
        console.log(inputValidation.error.details);
        return res.status(422).send(inputValidation.error.details.map((item)=>item.message));
    }

    try {
        const checkuser = await db.collection('users').findOne({ email: user.email });
        if(!checkuser) {
            console.log('User registration not found');
            return res.status(403).send('Email or password not valid!');
        }
    
        if(!bcrypt.compareSync(user.password, checkuser.password)) {
            console.log('Password invalid');
            return res.status(403).send('Email or password not valid!');
        }

        res.locals.userId = checkuser._id;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { signUpValidation, signInValidation };