import Joi from 'joi';

export const RegisterSchema = Joi.object({
    phone: Joi.string().max(12).min(12).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().max(50).min(2).required(),
    surname: Joi.string().max(50).min(2).required(),
    email: Joi.string()


});

export const PhoneLoginSchema = Joi.object({
    phone: Joi.string().max(12).min(12).required(),
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

