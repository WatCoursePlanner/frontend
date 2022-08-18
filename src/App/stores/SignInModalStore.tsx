import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, makeObservable, observable } from "mobx";
import * as React from "react";

export enum SignInModalType {
  NONE, SIGNIN, SIGNUP
}

export class SignInModalStore {
  private static _instance: SignInModalStore;
  public static get(): SignInModalStore {
    return this._instance ||
      (this._instance = new this());
  }

  @observable
  currentModal: SignInModalType = SignInModalType.NONE;

  private constructor() {
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
