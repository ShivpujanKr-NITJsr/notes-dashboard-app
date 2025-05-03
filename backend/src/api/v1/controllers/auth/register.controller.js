import bcrypt from "bcrypt";
import services from "../../../../services/index.js";
import UsersModel from "../../../../models/users.model.js"; // Import the UsersModel model
import { StatusCodes } from "http-status-codes";
import MESSAGE from "../../../../constants/message.js";
import service from "../../../../services/index.js";

const register = async (req, res) => {
  try {
    console.log("running register controller");
    const { name, email, password } = req.body;

    const existingUser = await services.auth.isRegisteredEmail(email);
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: MESSAGE.post.fail });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await UsersModel.create({
      name,
      email,
      password: hashedPassword,
    });
    // Create response object without password
    const userObject = user.toObject();

    delete userObject.password;
    // Generate JWT token
    const token = service.auth.generateJWT({
      email: userObject.email,
      id: userObject._id,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: MESSAGE.post.succ, result: userObject, token });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGE.post.fail, error });
  }
};

export default register;
