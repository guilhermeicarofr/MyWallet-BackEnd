import { db } from '../database/db.js';

async function validateAuthToken(req,res,next) {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if(!token) {
        console.log('Invalid auth: token not found');
        return res.sendStatus(401);
    }

    try {
        const session = await db.collection('sessions').findOne({ token });
        if(!session) {
            console.log('Invalid auth: session not found');
            return res.sendStatus(401);
        }

        const user = await db.collection('users').findOne({ _id: session.userId });
        if (!user) {
            console.log('Invalid auth: user not found');
            return res.sendStatus(401);
        }

        res.locals.userId = user._id;
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { validateAuthToken };