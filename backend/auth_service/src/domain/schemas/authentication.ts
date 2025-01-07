import Joi from 'joi';

export const RegisterSchema = Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().max(50).min(2).required(),
    surname: Joi.string().max(50).min(2).required(),
    email: Joi.string()
});

export const PhoneLoginSchema = Joi.object({
    phoneNumber: Joi.string().required(),
    password: Joi.string()
        .min(6)
        .required(),
});

export const EmailLoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string()
        .min(6)
        .required(),
});

export const UpdateUserSchema = Joi.object({
    name: Joi.string().max(50).min(2),
    surname: Joi.string().max(50).min(2),
    phoneNumber: Joi.string(),
    email: Joi.string().email()
}).min(1);

