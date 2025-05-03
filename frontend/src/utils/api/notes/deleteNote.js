import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import { AUTHORIZATION } from "../../../constants/api/auth";
import MESSAGE from "../../../constants/message";

const { del } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "notes/";

export const deleteNote = async (_payload) => {
   
  try {
  
    const endpoint = `${initialRoute}delete/${_payload.id}`;

    const token = localStorage.getItem("jwt_token"); // Get the token from local storage or jwt

    const response = await del(endpoint,  {
      ...headers,
      [Authorization]: `${Bearer} ${token}`,
    });

    if (response) {
      const {
        data: { message },
      } = response;
// console.log("response", response);
      if (message == MESSAGE.delete.succ) {
        
        return true
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === StatusCodes.UNAUTHORIZED) {
        alert("Wrong password");
      }else {
        alert("something went wrong")
      }
    }
    throw error;
  }
};
