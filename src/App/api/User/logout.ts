import { URL_BASE, USER } from "../consts";
import post from "../http/post";

export default function logout(): Promise<boolean> {
  return post(
    `${URL_BASE}${USER}/logout`,
  );
};
