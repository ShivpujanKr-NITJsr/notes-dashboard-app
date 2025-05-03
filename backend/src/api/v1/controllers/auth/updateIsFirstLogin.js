import bcrypt from 'bcrypt';

import UsersModel from '../../../../models/users.model.js';

import MESSAGE from '../../../../constants/message.js';
import { StatusCodes } from 'http-status-codes';
import service from '../../../../services/index.js';


const updateUserIsFirstLogin = async (req, res) => {
  try {
    const { id } = req.params;

    
    const user = await UsersModel.findOneAndUpdate({ _id:id },{isFirstLogin:false},
        { new: true });

    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: MESSAGE.put.fail });
    }

   
    
    // Create response object without password
    const userObject = user.toObject();
    
    delete userObject.password; 
    // Generate JWT token
    const token = service.auth.generateJWT({ email: userObject.email, id: userObject._id });

    return res.status(StatusCodes.OK).json({ 
      message: MESSAGE.put.succ,
      result: userObject,
      token
    });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error.',error });
  }
};


export default updateUserIsFirstLogin;