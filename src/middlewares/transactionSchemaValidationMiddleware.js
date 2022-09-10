import { transactionSchema } from '../schemas/transactionSchema.js';

function validateTransactionSchema(req,res,next) {
    const transaction = req.body;

    const inputValidation = transactionSchema.validate(transaction, { abortEarly: false });
    if(inputValidation.error) {
        console.log(inputValidation.error.details);
        return res.status(422).send(inputValidation.error.details.map((item)=>item.message));
    }
    
    res.locals.transaction = {
        title: transaction.title,
        type: transaction.type,
        value: Number(transaction.value)
    };
    next();
}

export { validateTransactionSchema };