import createStudentProfile from "@watcourses/api/StudentProfile/create";
import {
  CoopStream,
  CourseInfo,
  CreateStudentProfileRequest,
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

interface IAddCourseToTermProps extends IAddCourseProps, ITermOperationProps {
}

interface IRemoveCourseFromTermProps extends IRemoveCourseProps, ITermOperationProps {
}

export const SHORTLIST_TERM_NAME = "shortlist";

export class StudentProfileStore {
  static get = singletonGetter(StudentProfileStore);

  // TODO implement student profile
  private readonly SampleProfileRequest =
    buildProto<CreateStudentProfileRequest>({
      degrees: ["Software Engineering"],
      startingYear: 2019,
      coopStream: CoopStream.STREAM_8,
    });

  @observable
  private studentProfilePromise?: IPromiseBasedObservable<StudentProfile>;

  @observable
  workingStudentProfile: StudentProfile =
    buildProto<StudentProfile>({
      schedule: {
        terms: [],
      },
      shortList: [],
    });

  @computed
  get isLoading(): boolean {
    return this.studentProfilePromise?.state === PENDING;
  }

  @computed
  get isDirty(): boolean {
    return !isEqual(
      this.studentProfile?.schedule,
      this.workingStudentProfile.schedule
    );
  }

  @computed
  private get studentProfile(): StudentProfile | undefined {
    return this.studentProfilePromise?.case({
      fulfilled: (response: StudentProfile) => response,
    });
  }

  constructor() {
    makeAutoObservable(this);
    when(
      () => this.studentProfilePromise?.state === FULFILLED,
      () => {
        if (!this.studentProfile) {
          return;
        }
        this.workingStudentProfile = this.studentProfile;
        saveStudentProfile(this.studentProfile);
      },
    );
  }

  init(): Promise<StudentProfile> {
    if (this.studentProfile) {
      // Profile might have been initialized from UserStore
      // if there is an active user session
      return Promise.resolve(this.studentProfile)
    }
    return this.fetchStudentProfile(this.SampleProfileRequest);
  }

  @action
  setStudentProfile = (profile: StudentProfile): Promise<StudentProfile> => {
    const promise = Promise.resolve(profile)
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };

  @action
  fetchStudentProfile = (
    request: CreateStudentProfileRequest,
  ): Promise<StudentProfile> => {
    const promise = createStudentProfile(request);
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };

  @computed
  get allTerms(): Schedule_TermSchedule[] {
    return this.studentProfile?.schedule?.terms ?? [];
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
    if (!this.workingStudentProfile.schedule) {
      return;
    }
    const isShortList = termName === SHORTLIST_TERM_NAME;
    this.workingStudentProfile = buildProto<StudentProfile>({
      ...this.workingStudentProfile,
      schedule: isShortList ? this.workingStudentProfile.schedule : {
        ...this.workingStudentProfile.schedule,
        terms: this.workingStudentProfile.schedule.terms
          .map((term) =>
            (term.termName === termName)
              ? {
                ...term,
                courseCodes: isAdd
                  ? insertAt(term.courseCodes, index, code)
                  : removeAt(term.courseCodes, index),
              }
              : term,
          ),
      },
      // TODO shortlist change should invoke API call immediately
      shortList: isShortList
        ? (
          isAdd
            ? insertAt(this.workingStudentProfile.shortList, index, code)
            : removeAt(this.workingStudentProfile.shortList, index)
        )
        : this.workingStudentProfile.shortList,
    });
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
        .indexOf(indexOrCode) ?? -1,
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
        : this.workingStudentProfile.shortList.indexOf(indexOrCode) ?? -1,
    });
  };

  isInShortList = (courseCode: string) => {
    return this.workingStudentProfile.shortList.includes(courseCode);
  };

  moveCourse = (
    course: CourseInfo,
    fromTerm: Schedule_TermSchedule,
    toTerm: Schedule_TermSchedule,
    index: number = -1,
  ) => {
    this.removeCourseFromTerm({
      termName: fromTerm.termName,
      indexOrCode: course.code,
    });
    this.addCourseToTerm({
      termName: toTerm.termName,
      code: course.code,
      index,
    });
  };

  @action
  save = () => {
    const userEmail = UserStore.get().userEmail;
    if (!userEmail) {
      // TODO prompt to create account
      return
    }
  }
}
