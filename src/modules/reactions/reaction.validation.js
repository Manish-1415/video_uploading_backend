import Joi from "joi";

export const reactionValidationSchema = Joi.object({
  reaction: Joi.string()
    .valid("like", "dislike")
    .required()
});
