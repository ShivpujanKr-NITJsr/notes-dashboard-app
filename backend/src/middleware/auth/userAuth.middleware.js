import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../constants/message.js";
import UsersModel from "../../models/users.model.js";

// Function to verify user JWT

export const userAuth = async (req, res, next) => {
  // Get the token from the request headers
  try {
// console.log("req",req)
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: MESSAGE.custom("Access denied. No token provided") });
    }
    const token = authHeader.replace("Bearer ", ""); // Extract the token from the "Bearer" format

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: MESSAGE.custom("Access denied. No token provided") });
    }

    // Verify the token and attach the decoded data to the request object
    const secretKey = process.env.JWT_KEY;
    const decoded = jwt.verify(token, secretKey);
    const User = await UsersModel.findOne({ email: decoded.email });
    if (!User) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: MESSAGE.custom("Access denied. Invalid token") });
    }
    req.user = User; // Attach the decoded payload to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("JWT verification error:", error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({
        message: MESSAGE.custom("Invalid Token!"),
        error: error,
        token: req.headers("token"),
      });
  }
};
