import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import MESSAGE from "../../../../../frontend/src/constants/message";

const { post } = request;

const initialRoute = "auth/";

export const register = async (_payload) => {
  try {
    const payload = JSON.stringify(_payload);
    const endpoint = `${initialRoute}register`;
    const response = await post(endpoint, payload, headers);
    // console.log("response", response);
    if (response) {
      const {
        data: { message },
      } = response;

      if (message == MESSAGE.post.succ) {
        const {
          data: { result, token },
        } = response;
        // console.log(response.data);
        return { result, token };
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === StatusCodes.CONFLICT) {
        alert("email is already Registered")
        throw error
        
      }else if( status==StatusCodes.BAD_GATEWAY){
        if (error.details[0]?.message) {
          alert(error.details[0].message);
        } else {
          alert("something went wrong")
        }
      }

      throw error;
    }
  }
};
