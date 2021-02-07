import { UserInfo } from "@watcourses/proto/user";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";

export class UserStore {
  static get = singletonGetter(UserStore);

  user: UserInfo;

  constructor() {
    this.user = UserInfo.fromPartial({});
  }
}
