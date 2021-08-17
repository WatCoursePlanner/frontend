import getUserInfo from "@watcourses/api/User/get";
import login from "@watcourses/api/User/login";
import {
  LoginRequest,
  RegisterRequest,
  UserInfo,
} from "@watcourses/proto/user";
import { buildProto } from "@watcourses/utils/buildProto";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, computed, observable } from "mobx";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";
import { StudentProfileStore } from "./StudentProfileStore";

interface ILoginProps {
  email: string,
  password: string,
}

interface ISignUpProps {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export class UserStore {
  static get = singletonGetter(UserStore);

  @observable
  private userInfoPromise?: IPromiseBasedObservable<UserInfo | undefined>;

  @computed
  get isLoading(): boolean {
    return this.userInfoPromise?.state === PENDING;
  }

  @computed
  get userEmail(): string | undefined {
    return this.user.email;
  }

  @computed
  get user(): UserInfo {
    return this.userInfoPromise?.case({
      fulfilled: (response) => response,
    }) ?? UserInfo.fromPartial({});
  }

  init(): Promise<UserInfo | undefined> {
    return this.fetchUserInfo();
  }

  @action
  fetchUserInfo = (): Promise<UserInfo | undefined> => {
    const promise =
      getUserInfo()
        .then((response) => response.userInfo)
        .then(async (userInfo) => {
          await this.maybeSetStudentProfileFrom(userInfo);
          return userInfo;
        });
    this.userInfoPromise = fromPromise(promise);
    return promise;
  };

  @action
  private async maybeSetStudentProfileFrom(userInfo?: UserInfo) {
    if (userInfo?.studentProfile) {
      await StudentProfileStore.get()
        .setStudentProfile(userInfo.studentProfile);
    }
  }

  @action
  login = (partial: ILoginProps) => {
    this.userInfoPromise = fromPromise(
      login(buildProto<LoginRequest>(partial))
        .then((response) => response.userInfo),
    );
  };

  @action
  signUp = (partial: ISignUpProps) => {
    this.userInfoPromise = fromPromise(
      login(buildProto<RegisterRequest>(partial))
        .then((response) => response.userInfo),
    );
  };

  @action
  googleSignIn = (partial: ISignUpProps) => {
    this.userInfoPromise = fromPromise(
      login(buildProto<RegisterRequest>(partial))
        .then((response) => response.userInfo),
    );
  };
}
