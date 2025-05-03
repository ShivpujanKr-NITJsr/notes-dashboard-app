
import User from '../../models/users.model.js'; // Import the User model

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const isRegisteredEmail = async (email) => {
    try {
        if (!email) return false; 
        const existingUser = await User.findOne({ email });
        return !!existingUser; 
    } catch (error) {
        console.error('Error checking email registration:', error);
       
        throw error; 
    }
};

const comparePassword = async (password, hashedPassword) => {
    
        const compare= await bcrypt.compare(password, hashedPassword);
        if(compare) return true;
        return false;
    
};

const generateJWT = (jwtPayload) => {
    const jwtToken = jwt.sign({...jwtPayload}, process.env.JWT_KEY, {
        expiresIn: '1y',
    });
 
    return jwtToken;
};

export default  {
    isRegisteredEmail,
    comparePassword,
    generateJWT,
    // Other auth-related functions can be added here
};