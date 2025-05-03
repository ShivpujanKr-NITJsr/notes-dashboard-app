import Joi from 'joi';
import { loginValidator } from './auth/login.validators.js';
import { registerValidator } from './auth/register.validators.js';



export const validators = {
    auth: {
        register:registerValidator,
        login: loginValidator
    },
    // notes:{
    //     createNote:productValidationSchema,
    //     updateNote:productValidationSchema,
    // }
};