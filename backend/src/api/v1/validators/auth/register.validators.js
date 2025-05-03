import Joi from "joi";


export const registerValidator = Joi.object({
  name: Joi.string()
    .min(1) // Name must have at least 1 character
    .required()
    .messages({
      "string.empty": "Name is required",
      "any.required": "Name is required",
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } }) // Validates email format
    .required()
    .messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(6) // Password must be at least 6 characters long
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long",
      "any.required": "Password is required",
    })
});