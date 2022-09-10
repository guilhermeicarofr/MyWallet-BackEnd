import joi from 'joi';

const transactionSchema = joi.object({
    title: joi.string().required(),
    value: joi.number().required(),
    type: joi.string().valid('+','-').required()
});

export { transactionSchema };