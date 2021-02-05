import createStudentProfile from "@watcourses/api/StudentProfile/create";
import { CoopStream, CreateStudentProfileRequest, StudentProfile } from "@watcourses/proto/courses";
import { buildProto } from "@watcourses/utils/buildProto";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";

export class StudentProfileStore {
  static get = singletonGetter(StudentProfileStore);

  // TODO implement student profile
  private readonly SampleProfileRequest = buildProto<CreateStudentProfileRequest>({
    degrees: ["Software Engineering"],
    startingYear: 2019,
    coopStream: CoopStream.STREAM_8
  })

  @observable
  private studentProfilePromise?: IPromiseBasedObservable<StudentProfile>

  @computed
  get isLoading(): boolean {
    return this.studentProfilePromise?.state === PENDING;
  }

  @computed
  get studentProfile(): StudentProfile {
    return this.studentProfilePromise?.case({
      fulfilled: response => response
    }) ?? buildProto<StudentProfile>({})
  }

  constructor() {
    makeAutoObservable(this);
  }

  init(): Promise<StudentProfile> {
    return this.fetchStudentProfile();
  }

  @action
  private fetchStudentProfile = (): Promise<StudentProfile> => {
    const promise = createStudentProfile(this.SampleProfileRequest);
    this.studentProfilePromise = fromPromise(promise);
    return promise;
  };
}
