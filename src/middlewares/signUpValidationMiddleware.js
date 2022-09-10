import { signUpSchema } from "../schemas/userSchemas.js";
import { db } from '../database/db.js';

async function signUpValidation(req,res,next) {
    const user = req.body;

    const inputValidation = signUpSchema.validate(user, { abortEarly: false });
    if(inputValidation.error) {
        console.log(inputValidation.error.details);
        return res.status(422).send(inputValidation.error.details.map((item)=>item.message));
    }

    const checkuser = await db.collection('users').findOne({ email: user.email });
    if(checkuser) {
        console.log('Email already on database');
        return res.status(409).send('You already have an account!');
    }

    res.locals.newUser = user;
    next();
}

export { signUpValidation };