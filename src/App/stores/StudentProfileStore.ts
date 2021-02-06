import createStudentProfile from "@watcourses/api/StudentProfile/create";
import {
  CoopStream,
  CreateStudentProfileRequest,
  StudentProfile,
} from "@watcourses/proto/courses";
import { buildProto } from "@watcourses/utils/buildProto";
import { insertAt, removeAt } from "@watcourses/utils/helpers";
import { saveStudentProfile } from "@watcourses/utils/LocalStorage";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, computed, makeAutoObservable, observable, when } from "mobx";
import {
  fromPromise,
  FULFILLED,
  IPromiseBasedObservable,
  PENDING,
} from "mobx-utils";

interface IAddOrRemoveCourseProps {
  isAdd: boolean,
  termName: string,
  index: number,
  code?: string,
}

export interface IAddCourseProps {
  index: number,
  code?: string,
}

export interface IRemoveCourseProps {
  indexOrCode: number | string,
}

export interface IAddCourseToTermProps extends IAddCourseProps {
  termName: string,
}

export interface IRemoveCourseFromTermProps {
  termName: string,
  index: number,
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

  @computed
  get isLoading(): boolean {
    return this.studentProfilePromise?.state === PENDING;
  }

  private cachedStudentProfile: StudentProfile =
    buildProto<StudentProfile>({
      schedule: {
        terms: [],
      },
    });

  @computed
  get studentProfile(): StudentProfile {
    return this.studentProfilePromise?.case({
      fulfilled: (response: StudentProfile) => response,
      rejected: () => buildProto<StudentProfile>({
        schedule: {
          terms: [],
        },
      }),
    }) ?? this.cachedStudentProfile;
  }

  constructor() {
    makeAutoObservable(this);
    when(
      () => this.studentProfilePromise?.state === FULFILLED,
      () => {
        this.cachedStudentProfile = this.studentProfile;
        saveStudentProfile(this.studentProfile);
      },
    );
  }

  init(): Promise<StudentProfile> {
    return this.fetchStudentProfile(this.SampleProfileRequest);
  }

  @action
  fetchStudentProfile = (
    request: CreateStudentProfileRequest,
  ): Promise<StudentProfile> => {
    const promise = createStudentProfile(request);
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };

  @action
  private addOrRemoveFromTermOrShortlist = ({
    isAdd,
    termName,
    index,
    code,
  }: IAddOrRemoveCourseProps) => {
    if (!this.studentProfile.schedule) {
      return;
    }
    const isShortList = termName === SHORTLIST_TERM_NAME;
    const newProfile = buildProto<StudentProfile>({
      ...this.studentProfile,
      schedule: isShortList ? this.studentProfile.schedule : {
        ...this.studentProfile.schedule,
        terms: this.studentProfile.schedule.terms
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
      shortList: isShortList
        ? (
          isAdd
            ? insertAt(this.studentProfile.shortList, index, code)
            : removeAt(this.studentProfile.shortList, index)
        )
        : this.studentProfile.shortList,
    });
    this.cachedStudentProfile = newProfile;
    this.studentProfilePromise = fromPromise(Promise.resolve(newProfile));
  };

  @action
  addCourseToTerm = ({code, termName, index}: IAddCourseToTermProps) => {
    this.addOrRemoveFromTermOrShortlist({
      isAdd: true, code, termName, index,
    });
  };

  @action
  removeCourseFromTerm = ({termName, index}: IRemoveCourseFromTermProps) => {
    this.addOrRemoveFromTermOrShortlist({
      isAdd: false, termName, index,
    });
  };

  @action
  addCourseToShortList = ({code, index}: IAddCourseProps) => {
    this.addOrRemoveFromTermOrShortlist({
      isAdd: true, termName: SHORTLIST_TERM_NAME, code, index,
    });
  };

  @action
  removeCourseFromShortlist = ({indexOrCode}: IRemoveCourseProps) => {
    this.addOrRemoveFromTermOrShortlist({
      isAdd: false,
      termName: SHORTLIST_TERM_NAME,
      index: typeof indexOrCode === "number"
        ? indexOrCode
        : this.studentProfile.shortList.findIndex(code => code === indexOrCode),
    });
  };

  isInShortList = (courseCode: string) => {
    return this.studentProfile.shortList.includes(courseCode);
  };
}
