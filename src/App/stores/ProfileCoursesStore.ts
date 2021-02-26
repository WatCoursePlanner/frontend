import checkStudentProfile from "@watcourses/api/StudentProfile/check";
import {
  CheckResults,
  CheckResults_Issue,
  CourseInfo,
  StudentProfile,
} from "@watcourses/proto/courses";
import { buildProto } from "@watcourses/utils/buildProto";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, computed, makeAutoObservable, observable, when } from "mobx";
import {
  fromPromise,
  FULFILLED,
  IPromiseBasedObservable,
  PENDING,
} from "mobx-utils";

import { StudentProfileStore } from "./StudentProfileStore";

type IProfileCoursesMapping = { [courseCode: string]: CourseInfo }

interface IProfileCourses {
  courses?: IProfileCoursesMapping,
  issues?: CheckResults_Issue[]
}

export class ProfileCoursesStore {
  static get = singletonGetter(ProfileCoursesStore);

  @observable
  private profileCoursesPromise?: IPromiseBasedObservable<CheckResults>;

  @computed
  get isLoading(): boolean {
    return this.profileCoursesPromise?.state === PENDING;
  }

  @computed
  get profileCourses(): IProfileCourses {
    return this.profileCoursesPromise?.case({
      fulfilled: (response) => {
        const courses: IProfileCoursesMapping = {};
        for (const course of response.checkedCourses) {
          courses[course.code] = course;
        }
        return buildProto<IProfileCourses>({
          courses,
          issues: response.issues,
        });
      },
      rejected: () => buildProto<IProfileCourses>({
        courses: {},
      }),
    }) ?? this.cachedProfileCourses;
  }

  private cachedProfileCourses: IProfileCourses =
    buildProto<IProfileCourses>({
      courses: {},
    });

  constructor() {
    makeAutoObservable(this);
    when(
      () => this.profileCoursesPromise?.state === FULFILLED,
      () => {
        this.cachedProfileCourses = this.profileCourses;
      },
    );
  }

  init() {
    this.fetchProfileCourses();
  }

  @action
  fetchProfileCourses = () => {
    this.profileCoursesPromise = fromPromise(
      checkStudentProfile(
        buildProto<StudentProfile>(
          StudentProfileStore.get().workingStudentProfile,
        ),
      ),
    );
  };
}
