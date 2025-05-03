import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import { AUTHORIZATION } from "../../../constants/api/auth";
import MESSAGE from "../../../constants/message";

const { post } = request;

const { Authorization, Bearer } = AUTHORIZATION;

const initialRoute = "notes/";

export const createNote = async (_payload) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const payload = JSON.stringify(_payload);
    const endpoint = `${initialRoute}create-note`;
    const token = localStorage.getItem("jwt_token"); // Get the token from local storage or jwt
    const response = await post(endpoint, payload, {
      ...headers,
      [Authorization]: `${Bearer} ${token}`,
    });
   

    if (response) {
      const {
        data: { message },
      } = response;
// console.log("response", response);
      if (message == MESSAGE.post.succ) {
        const {
          data: {  result,error}
        } = response;
        if(error){
          alert(`${error} in HuggingFaceModel server`)
        }
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
      }else{
        alert("Internal Server Error")
      }
    }
    throw error;
  }
};
