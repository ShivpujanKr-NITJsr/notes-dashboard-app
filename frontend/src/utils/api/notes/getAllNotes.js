import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import { AUTHORIZATION } from "../../../constants/api/auth";
import MESSAGE from "../../../constants/message";

const { get } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "notes/";

export const getAllNotes = async () => {
  // eslint-disable-next-line no-useless-catch
  try {
   
    const endpoint = `${initialRoute}get-all-notes`;
    const token = localStorage.getItem("jwt_token"); // Get the token from local storage or jwt
   
    const response = await get(endpoint,  {
      ...headers,
      [Authorization]: `${Bearer} ${token}`,
    });

    if (response) {
      const {
        data: { message },
      } = response;
// console.log("response", response);
      if (message == MESSAGE.get.succ) {
        const {
          data: { result },
        } = response;
        return result
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === StatusCodes.UNAUTHORIZED) {
        alert("Unauthorized access. Please log in again.");
      }
    }else if(error.message === "Network Error") {
      alert("Network Error. Please check your connection.");
    }
    // console.log("error", error);
    throw error;
  }
};
