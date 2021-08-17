import { GetUserResponse } from "@watcourses/proto/user";

import { URL_BASE, USER } from "../consts";
import post from "../http/post";

export default function getUserInfo(): Promise<GetUserResponse> {
  return post(`${URL_BASE}${USER}/get`);
};
