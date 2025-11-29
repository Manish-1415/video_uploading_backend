import Joi from "joi";

export const videoUploadSchema = Joi.object({
  title: Joi.string().trim().required(),
  
  description: Joi.string().trim().allow("", null),
  
  tags: Joi.array()
    .items(Joi.string().trim())
    .default([]),
});
