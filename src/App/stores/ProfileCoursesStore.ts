import checkStudentProfile from "@watcourses/api/StudentProfile/check";
import { CheckResults, CheckResults_Issue, CourseInfo, StudentProfile } from "@watcourses/proto/courses";
import { buildProto } from "@watcourses/utils/buildProto";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";

import { StudentProfileStore } from "./StudentProfileStore";

interface IProfileCourses {
  courses?: { [courseCode: string]: CourseInfo },
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
        const courses: { [courseCode: string]: CourseInfo } = {}
        for (const c of response.checkedCourses) {
          courses[c.code] = c
        }
        return buildProto<IProfileCourses>({
          courses,
          issues: response.issues
        });
      }
    }) ?? buildProto<IProfileCourses>({});
  }

  constructor() {
    makeAutoObservable(this);
  }

  init() {
    this.fetchProfileCourses();
  }

  @action
  private fetchProfileCourses = () => {
    this.profileCoursesPromise = fromPromise(
      checkStudentProfile(
        buildProto<StudentProfile>(
          StudentProfileStore.get().studentProfile
        )
      )
    );
  };
}
