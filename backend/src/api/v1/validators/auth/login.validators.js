import Joi from "joi";

export const loginValidator = Joi.object({
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
    }),
});