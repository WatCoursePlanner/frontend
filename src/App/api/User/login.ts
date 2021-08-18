import { LoginOrRegisterResponse, LoginRequest } from "@watcourses/proto/user";

import { URL_BASE, USER } from "../consts";
import post from "../http/post";

export default function login(
  data: LoginRequest,
): Promise<LoginOrRegisterResponse> {
  return post(
    `${URL_BASE}${USER}/login`,
    LoginRequest,
    data,
  );
};
