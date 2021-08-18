import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, makeObservable, observable } from "mobx";
import * as React from "react";

export enum SignInModalType {
  NONE, SIGNIN, SIGNUP
}

export class SignInModalStore {
  static get = singletonGetter(SignInModalStore);

  @observable
  currentModal: SignInModalType = SignInModalType.NONE;

  constructor() {
    makeObservable(this);
  }

  @action
  showSignIn() {
    this.currentModal = SignInModalType.SIGNIN;
  }

  @action
  showSignUp() {
    // TODO
    this.currentModal = SignInModalType.SIGNUP;
  }

  @action
  async dismiss() {
    // Wait for animation
    await new Promise(r => setTimeout(r, 500))
    this.currentModal = SignInModalType.NONE;
  }
}
