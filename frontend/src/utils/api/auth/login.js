import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { post } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "auth/";

export const login = async (_payload) => {
   
  try {
    const payload = JSON.stringify(_payload);
    const endpoint = `${initialRoute}login`;
    const response = await post(endpoint, payload, headers);

    if (response) {
      const {
        data: { message },
      } = response;
// console.log("response", response);
      if (message == "Authentication Successful!") {
        const {
          data: { message, result, token },
        } = response;
        return {
          message,
          result,
          token,
        };
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === StatusCodes.UNAUTHORIZED) {
        alert("Wrong password");
      }else if(status === StatusCodes.NOT_FOUND) {
        alert("User not found");
      }
    }
    throw error;
  }
};
