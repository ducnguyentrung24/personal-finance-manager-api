const Joi = require('joi');

exports.registerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(2)
        .max(50)
        .required(),

    email: Joi.string()
        .trim()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()
});

exports.loginSchema = Joi.object({
    email: Joi.string()
        .trim()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()
});

exports.changePasswordSchema = Joi.object({
    oldPassword: Joi.string()
        .min(6)
        .required(),
    
    newPassword: Joi.string()
        .min(6)
        .required()
});