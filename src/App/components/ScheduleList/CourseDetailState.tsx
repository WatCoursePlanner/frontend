import { CourseInfo } from "@watcourses/proto/courses";
import { RequisiteHelper } from "@watcourses/utils/RequisiteHelper";
import { action, computed, makeObservable, observable } from "mobx";
import React from "react";

export class CourseDetailState {

  @observable
  private readonly course?: CourseInfo;

  @computed
  get prerequisites() {
    return RequisiteHelper.getPreRequisite(this.course);
  };

  @computed
  get antirequisites() {
    return RequisiteHelper.getAntiRequisite(this.course);
  };

  @observable
  registeredDescendents: Set<React.RefObject<HTMLElement>>;

  private readonly updateRegisteredDescendents: (a: Set<React.RefObject<HTMLElement>>) => void;

  @observable
  scrolled: boolean = false;

  @action
  registerDescendent = (ref: React.RefObject<HTMLElement>) => {
    this.registeredDescendents.add(ref);
    this.updateRegisteredDescendents(this.registeredDescendents);
  };

  @action
  removeDescendent = (ref: React.RefObject<HTMLElement>) => {
    this.registeredDescendents.delete(ref);
    this.updateRegisteredDescendents(this.registeredDescendents);
  };

  @action
  handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 0 && !this.scrolled) {
      this.scrolled = true;
    } else if (e.currentTarget.scrollTop <= 0 && this.scrolled) {
      this.scrolled = false;
    }
  };

  constructor(
    _registeredDescendents: Set<React.RefObject<HTMLElement>>,
    _updateRegisteredDescendents: (a: Set<React.RefObject<HTMLElement>>) => void,
    _course?: CourseInfo,
  ) {
    makeObservable(this);
    this.course = _course;
    this.registeredDescendents = _registeredDescendents ?? new Set();
    this.updateRegisteredDescendents = _updateRegisteredDescendents;
  }
}