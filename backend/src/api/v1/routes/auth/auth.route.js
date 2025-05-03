import express from 'express';


import { validator } from '../../../../middleware/validator/validator.middleware.js';
import { validators } from '../../validators/index.js';
import { loginController, registerController, updateUserIsFirstLogin } from '../../controllers/index.js';
import { userAuth } from '../../../../middleware/auth/userAuth.middleware.js';

const router = express.Router();

// Route for user registration
router.post('/register',validator(validators.auth.register,null), registerController);
router.post('/login',validator(validators.auth.login,null), loginController);
router.put('/update-is-first-login/:id',userAuth, updateUserIsFirstLogin);
// router.post('/register', register); // for testing purpose only
// router.post('/login', login)

export default router;


// // routes/auth.js
// const router = require('express').Router();
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const User = require('../models/User');

// router.post('/signup', async (req, res) => {
//   const hashed = await bcrypt.hash(req.body.password, 10);
//   const user = new User({ ...req.body, password: hashed });
//   await user.save();
//   res.json({ message: 'User created' });
// });

// router.post('/login', async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user && await bcrypt.compare(req.body.password, user.password)) {
//     const token = jwt.sign({ id: user._id }, 'secret');
//     res.json({ token });
//   } else {
//     res.status(401).json({ error: 'Invalid credentials' });
//   }
// });

// module.exports = router;