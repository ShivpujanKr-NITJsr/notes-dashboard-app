import bcrypt from 'bcrypt';
// import db // Import the database models
// const { User } = db; // Extract the User model
import UsersModel from '../../../../models/users.model.js'; // Import the UsersModel

import MESSAGE from '../../../../constants/message.js';
import { StatusCodes } from 'http-status-codes';
import service from '../../../../services/index.js';


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await UsersModel.findOne({ email });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: MESSAGE.post.fail });
    }

    // Compare passwords
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: MESSAGE.post.fail });
    }

    
    // Create response object without password
    const userObject = user.toObject();
    
    delete userObject.password; 
    // Generate JWT token
    const token = service.auth.generateJWT({ email: userObject.email, id: userObject._id });

    return res.status(StatusCodes.OK).json({ 
      message: MESSAGE.custom("Authentication Successful!"),
      result: userObject,
      token
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.',error });
  }
};


export default login;