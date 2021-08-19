import getUserInfo from "@watcourses/api/User/get";
import googleSignIn from "@watcourses/api/User/googleSignIn";
import login from "@watcourses/api/User/login";
import logout from "@watcourses/api/User/logout";
import signup from "@watcourses/api/User/signup";
import {
  GoogleLoginOrRegisterRequest,
  LoginOrRegisterResponse,
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

interface IGoogleSignInProps {
  token: string,
}

interface ILoginProps {
  email: string,
  password: string,
}

interface ILoginOrSignupResult {
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
  login = async (partial: ILoginProps): Promise<ILoginOrSignupResult> => {
    return this.processLogInOrSignUp(
      login(buildProto<LoginRequest>(partial)),
    );
  };

  @action
  signUp = (partial: ISignUpProps): Promise<ILoginOrSignupResult> => {
    return this.processLogInOrSignUp(
      signup(buildProto<RegisterRequest>(partial)),
    );
  };

  @action
  googleSignIn = (
    partial: IGoogleSignInProps,
  ): Promise<ILoginOrSignupResult> => {
    return this.processLogInOrSignUp(
      googleSignIn(buildProto<GoogleLoginOrRegisterRequest>(partial)),
    );
  };

  private processLogInOrSignUp = (
    responsePromise: Promise<LoginOrRegisterResponse>,
  ): Promise<ILoginOrSignupResult> => {
    return responsePromise.then(async (response) => {
      if (response.success) {
        this.userInfoPromise = fromPromise(Promise.resolve(response.userInfo));
        await this.maybeSetStudentProfileFrom(response.userInfo);
      }
      return buildProto<ILoginOrSignupResult>({
        success: response.success,
        error: response.reason,
      });
    }).catch((error) => {
      return buildProto<ILoginOrSignupResult>({
        success: false,
        error,
      });
    });
  };

  @action
  signOut = async () => {
    await logout();
    gapi.auth2.getAuthInstance().signOut();
  };
}
