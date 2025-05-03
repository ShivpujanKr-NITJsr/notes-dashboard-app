import express from 'express';


import { validator } from '../../../../middleware/validator/validator.middleware.js';
import { validators } from '../../validators/index.js';
import { loginController, registerController, updateUserIsFirstLogin } from '../../controllers/index.js';
import { userAuth } from '../../../../middleware/auth/userAuth.middleware.js';

const router = express.Router();

// Route for user registration && isFirstLogin update
router.post('/register',validator(validators.auth.register,null), registerController);
router.post('/login',validator(validators.auth.login,null), loginController);
router.put('/update-is-first-login/:id',userAuth, updateUserIsFirstLogin);


export default router;
