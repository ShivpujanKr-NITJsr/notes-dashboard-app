import { StatusCodes } from "http-status-codes";

import { headers } from "../../../config/config";
import { request } from "../../api";
import MESSAGE from "../../../../../frontend/src/constants/message";
import { AUTHORIZATION } from "../../../constants/api/auth";

const { Authorization, Bearer } = AUTHORIZATION;
const { put } = request;

const initialRoute = "auth/update-is-first-login";

export const updateFirstLogin = async (_payload) => {
  try {
    const endpoint = `${initialRoute}/${_payload.id}`;
    const token = localStorage.getItem("jwt_token"); // Get the token from local storage or jwt
    const response = await put(
      endpoint,
      {},
      {
        ...headers,
        [Authorization]: `${Bearer} ${token}`,
      }
    );
    if (response) {
      const {
        data: { message },
      } = response;
      console.log("first", response);
      if (message == MESSAGE.put.succ) {
        const {
          data: { result, token },
        } = response;
        console.log(response);
        return { result, token };
      }
      throw new Error();
    }
    throw new Error();
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === StatusCodes.BAD_REQUEST) {
        alert("is first login updation error");
      }

      throw error;
    }
  }
};
