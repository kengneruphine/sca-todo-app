//Validating user input
import Joi from '@hapi/joi';

const registerValidation = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().min(1).required().trim().regex(/^[a-z]+$/), //accepts only letters
        lastName: Joi.string().min(1).required().trim().regex(/^[a-z]+$/),
        email: Joi.string().min(6).required().email().trim(),
        password: Joi.string().min(6).required().trim()
    });
    return schema.validate(data)
}
const loginValidation = (data) => {
    const schema =Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data)
}

const todoValidation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        status: Joi.string().required(),
        dueDate: Joi.date().required()
    });
    return schema.validate(data)
}
const todoListValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    })
    return schema.validation(data)
}

export { registerValidation ,loginValidation, todoValidation, todoListValidation };
