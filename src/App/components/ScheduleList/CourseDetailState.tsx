import { CourseInfo } from "@watcourses/proto/courses";
import { RequisiteHelper } from "@watcourses/utils/RequisiteHelper";
import { action, computed, makeObservable, observable } from "mobx";
import React from "react";

export class CourseDetailState {

  @observable
  private readonly _course?: CourseInfo;

  @computed
  get prerequisites() {
    return RequisiteHelper.getPreRequisite(this._course);
  };

  @computed
  get antirequisites() {
    return RequisiteHelper.getAntiRequisite(this._course);
  };

  @observable
  registeredDescendents: Set<React.RefObject<HTMLElement>> = new Set();

  @observable
  scrolled: boolean = false;

  @action
  registerDescendent = (ref: React.RefObject<HTMLElement>) => {
    this.registeredDescendents.add(ref);
  };

  @action
  removeDescendent = (ref: React.RefObject<HTMLElement>) => {
    this.registeredDescendents.delete(ref);
  };

  @action
  handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 0 && !this.scrolled) {
      this.scrolled = true;
    } else if (e.currentTarget.scrollTop <= 0 && this.scrolled) {
      this.scrolled = false;
    }
  };

  constructor(course?: CourseInfo) {
    makeObservable(this);
    this._course = course;
  }
}