import getUserInfo from "@watcourses/api/User/get";
import login from "@watcourses/api/User/login";
import {
  LoginRequest,
  RegisterRequest,
  UserInfo,
} from "@watcourses/proto/user";
import { buildProto } from "@watcourses/utils/buildProto";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import {
  action,
  computed,
  makeObservable,
  observable,
} from "mobx";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";

import { StudentProfileStore } from "./StudentProfileStore";

interface ILoginProps {
  email: string,
  password: string,
}

interface ILoginResult {
  success: boolean,
  error: string | undefined,
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
  get isLoggedIn(): boolean {
    return !!this.userEmail;
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

  constructor() {
    makeObservable(this);
  }

  @action
  fetchUserInfo = (): Promise<UserInfo | undefined> => {
    const promise =
      getUserInfo()
        .then((response) => response.user)
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
  login = async (partial: ILoginProps): Promise<ILoginResult> => {
    return login(buildProto<LoginRequest>(partial))
      .then(async (response) => {
        if (response.success) {
          this.userInfoPromise = fromPromise(Promise.resolve(response.userInfo));
          await this.maybeSetStudentProfileFrom(response.userInfo);
        }
        return buildProto<ILoginResult>({
          success: response.success,
          error: response.reason,
        });
      })
      .catch((error) => {
        return buildProto<ILoginResult>({
          success: false,
          error,
        });
      });
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

  @action
  signOut = () => {
    // TODO
  }
}
