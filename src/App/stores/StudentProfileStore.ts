import createStudentProfile from "@watcourses/api/StudentProfile/create";
import createOrUpdateStudentProfile
  from "@watcourses/api/StudentProfile/createOrUpdate";
import getDefaultStudentProfile from "@watcourses/api/StudentProfile/default";
import {
  CoopStream,
  CourseInfo,
  CreateStudentProfileRequest, Schedule,
  Schedule_TermSchedule,
  StudentProfile,
} from "@watcourses/proto/courses";
import { buildProto } from "@watcourses/utils/buildProto";
import { insertAt, removeAt } from "@watcourses/utils/helpers";
import { saveStudentProfile } from "@watcourses/utils/LocalStorage";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { isEqual } from "lodash";
import { action, computed, makeAutoObservable, observable, when } from "mobx";
import {
  fromPromise,
  FULFILLED,
  IPromiseBasedObservable,
  PENDING,
} from "mobx-utils";

import { ProfileCoursesStore } from "./ProfileCoursesStore";
import { UserStore } from "./UserStore";

interface IAddOrRemoveCourseProps extends ITermOperationProps {
  /**
   * Is the operation adding course to the term (will be deletion if false).
   */
  isAdd: boolean,
  /**
   * Index for insertion/deletion.
   * A negative index on insertion means inserting at the end.
   * A negative index performs no operation.
   */
  index: number,
  /**
   * Course code of the course to add, optional if removing.
   */
  code?: string,
}

interface IAddCourseProps {
  /**
   * Index for insertion.
   * A negative index means inserting at the end.
   */
  index: number,
  /**
   * Course code of the course to add / delete.
   */
  code: string,
}

interface IRemoveCourseProps {
  /**
   * Index or code of the code to remove.
   * A negative index performs no operation.
   */
  indexOrCode: number | string,
}

interface ITermOperationProps {
  /**
   * Term name for the term to operate on.
   * termName === SHORTLIST_TERM_NAME means to operate on the shortlist.
   */
  termName: string,
}

interface ISaveProfileResult {
  success: boolean,
  error: string | undefined,
}

interface IAddCourseToTermProps extends IAddCourseProps, ITermOperationProps {
}

interface IRemoveCourseFromTermProps extends IRemoveCourseProps, ITermOperationProps {
}

export const SHORTLIST_TERM_NAME = "shortlist";

export class StudentProfileStore {
  private static _instance: StudentProfileStore;
  public static get(): StudentProfileStore {
    return this._instance || (this._instance = new this());
  }

  // TODO implement create student profile
  private readonly SampleProfileRequest =
    buildProto<CreateStudentProfileRequest>({
      degrees: ["Software Engineering"],
      startingYear: 2019,
      coopStream: CoopStream.STREAM_8,
    });

  @observable
  private studentProfilePromise?: IPromiseBasedObservable<StudentProfile>;

  @observable
  workingSchedule: Schedule =
    buildProto<Schedule>({
      terms: [],
    });

  @observable
  shortList: string[] = [];

  @computed
  get isLoading(): boolean {
    return this.studentProfilePromise?.state === PENDING;
  }

  @computed
  get workingStudentProfile(): StudentProfile {
    return buildProto<StudentProfile>({
      ...this.studentProfile,
      schedule: this.workingSchedule,
    });
  }

  @computed
  get isDirty(): boolean {
    return !isEqual(
      this.studentProfile?.schedule,
      this.workingSchedule,
    );
  }

  @computed
  private get studentProfile(): StudentProfile | undefined {
    return this.studentProfilePromise?.case({
      fulfilled: (response: StudentProfile) => response,
    });
  }

  private constructor() {
    makeAutoObservable(this);
    when(
      () => this.studentProfilePromise?.state === FULFILLED,
      () => {
        if (this.studentProfile?.shortList) {
          this.shortList = this.studentProfile.shortList;
        }
        if (!this.studentProfile?.schedule || !this.isDirty) {
          return;
        }
        this.workingSchedule = this.studentProfile.schedule;
        saveStudentProfile(this.studentProfile);
      },
    );
  }

  async init(): Promise<StudentProfile> {
    if (this.studentProfile) {
      // Profile might have been initialized from UserStore
      // if there is an active user session
      return Promise.resolve(this.studentProfile);
    }
    if (UserStore.get().isLoggedIn) {
      // TODO
      return this.createStudentProfile(this.SampleProfileRequest);
    } else {
      // TODO
      return this.fetchDefaultStudentProfile("Software Engineering");
    }
  }

  @action
  setStudentProfile = (profile: StudentProfile): Promise<StudentProfile> => {
    const promise = Promise.resolve(profile);
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };

  @action
  createStudentProfile = (
    request: CreateStudentProfileRequest,
  ): Promise<StudentProfile> => {
    const promise = createStudentProfile(request);
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };

  @action
  fetchDefaultStudentProfile = (
    program: string,
  ): Promise<StudentProfile> => {
    const promise = getDefaultStudentProfile(program);
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };

  @computed
  get allTerms(): Schedule_TermSchedule[] {
    return this.workingSchedule?.terms ?? [];
  }

  findTermsWithCourse = (code: string) => {
    return this.allTerms.filter(term => term.courseCodes.includes(code));
  };

  @action
  private addOrRemoveFromTermOrShortlist = ({
    isAdd,
    termName,
    index,
    code,
  }: IAddOrRemoveCourseProps): void => {
    if (!this.workingSchedule) {
      return;
    }
    const isShortList = termName === SHORTLIST_TERM_NAME;
    if (isShortList) {
      if (!this.studentProfile?.shortList) {
        return;
      }
      let shortList: string[] = [];
      if (isAdd) {
        if (!code) {
          return;
        }
        shortList = insertAt(this.studentProfile.shortList, index, code, false);
      } else {
        shortList = removeAt(this.studentProfile.shortList, index);
      }
      this.updateShortList(shortList);
    } else {
      this.workingSchedule = buildProto<Schedule>({
        ...this.workingSchedule,
        terms: this.workingSchedule.terms
          .map((term) =>
            (term.termName === termName)
              ? {
                ...term,
                courseCodes: isAdd
                  ? insertAt(term.courseCodes, index, code, false)
                  : removeAt(term.courseCodes, index),
              }
              : term,
          ),
      });
    }
  };

  addCourseToTerm = ({code, termName, index}: IAddCourseToTermProps) => {
    return this.addOrRemoveFromTermOrShortlist({
      isAdd: true, code, termName, index,
    });
  };

  removeCourseFromTerm = ({
    termName,
    indexOrCode,
  }: IRemoveCourseFromTermProps) => {
    return this.addOrRemoveFromTermOrShortlist({
      isAdd: false,
      termName,
      index: typeof indexOrCode === "number"
        ? indexOrCode
        : this.allTerms
        .find(it => it.termName === termName)?.courseCodes
        .indexOf(indexOrCode) ?? this.shortList.indexOf(indexOrCode) ?? -1,
    });
  };

  removeCourseFromSchedule = (code: string) => {
    return this.allTerms
      .forEach(term => this.removeCourseFromTerm({
        termName: term.termName,
        indexOrCode: code,
      }));
  };

  addCourseToShortList = ({code, index}: IAddCourseProps) => {
    return this.addOrRemoveFromTermOrShortlist({
      isAdd: true, termName: SHORTLIST_TERM_NAME, code, index,
    });
  };

  removeCourseFromShortlist = ({indexOrCode}: IRemoveCourseProps) => {
    return this.addOrRemoveFromTermOrShortlist({
      isAdd: false,
      termName: SHORTLIST_TERM_NAME,
      index: typeof indexOrCode === "number"
        ? indexOrCode
        : this.studentProfile?.shortList.indexOf(indexOrCode) ?? -1,
    });
  };

  isInShortList = (courseCode: string) => {
    return !!this.studentProfile?.shortList.includes(courseCode);
  };

  moveCourse = (
    course: CourseInfo,
    fromTerm: string,
    toTerm: string,
    index: number = -1,
  ) => {
    this.removeCourseFromTerm({
      termName: fromTerm,
      indexOrCode: course.code,
    });
    this.addCourseToTerm({
      termName: toTerm,
      code: course.code,
      index,
    });
  };

  @action
  save = (): Promise<ISaveProfileResult> => {
    return createOrUpdateStudentProfile(this.workingStudentProfile)
      .then(async (response) => {
        this.studentProfilePromise = fromPromise(Promise.resolve(response));
        return buildProto<ISaveProfileResult>({
          success: true,
        });
      }).catch((error) => {
        return buildProto<ISaveProfileResult>({
          success: false,
          error,
        });
      });
  };

  @action
  updateShortList = async (shortList: string[]) => {
    this.shortList = shortList;
    await createOrUpdateStudentProfile(buildProto<StudentProfile>({
      ...this.studentProfile,
      shortList,
    }))
      .then((response) => {
        this.studentProfilePromise = fromPromise(Promise.resolve(response));
      }).catch((error) => {
        // TODO handle error
      });
    await ProfileCoursesStore.get().fetchProfileCourses();
  };
}
