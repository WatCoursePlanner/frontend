import {
  GoogleLoginOrRegisterRequest,
  LoginOrRegisterResponse,
} from "@watcourses/proto/user";

import { URL_BASE, USER } from "../consts";
import post from "../http/post";

export default function googleSignIn(
  data: GoogleLoginOrRegisterRequest,
): Promise<LoginOrRegisterResponse> {
  return post(
    `${URL_BASE}${USER}/google`,
    data,
    GoogleLoginOrRegisterRequest,
    LoginOrRegisterResponse,
  );
};
