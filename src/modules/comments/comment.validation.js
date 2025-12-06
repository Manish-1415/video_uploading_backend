import Joi from "joi";

export const commentValidation = Joi.object({
    comment: Joi.string()
        .trim()
        .min(1)
        .max(500)
        .required()
        .messages({
            "string.base": "Comment must be a text.",
            "string.empty": "Comment cannot be empty.",
            "string.min": "Comment cannot be empty.",
            "string.max": "Comment cannot exceed 500 characters.",
            "any.required": "Comment is required."
        })
});
