import Joi from "joi";

export const registerSchema = Joi.object({
    name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(6).required(),
    role: Joi.string(),
    position : Joi.string(),
})

export const loginSchema = Joi.object({
    email : Joi.string().email().required(),
    password: Joi.string().min(6).required(),
})