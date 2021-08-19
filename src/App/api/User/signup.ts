import {
  LoginOrRegisterResponse,
  RegisterRequest,
} from "@watcourses/proto/user";

import { URL_BASE, USER } from "../consts";
import post from "../http/post";

export default function signup(
  data: RegisterRequest,
): Promise<LoginOrRegisterResponse> {
  return post(
    `${URL_BASE}${USER}/register`,
    RegisterRequest,
    data,
  );
};
