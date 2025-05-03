import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { post } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "notes/";

export const getFilteredNotes = async (_payload) => {
  // eslint-disable-next-line no-useless-catch
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
      }
    }
    throw error;
  }
};
