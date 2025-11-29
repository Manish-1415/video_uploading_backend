import Joi from "joi";

// When user try to update its profile
export const updateSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string()
        .min(6)
        .max(20)
        .optional()
});