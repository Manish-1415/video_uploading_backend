import Joi from "joi";

export const registerSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(6)
        .max(20)
        .required(),

    role: Joi.string().valid("user", "admin").required(),
});