import searchCourses from "@watcourses/api/Course/search";
import { COURSES_INFO_REFRESH_TIME } from "@watcourses/constants/api";
import { CourseInfo, SearchCourseRequest, SearchCourseResponse } from "@watcourses/proto/courses";
import { buildProto } from "@watcourses/utils/buildProto";
import { singletonGetter } from "@watcourses/utils/SingletonGetter";
import { action, computed, makeAutoObservable, observable } from "mobx";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";

const LOCAL_STORAGE_COURSES_KEY = "LOCAL_STORAGE_COURSES_KEY";

interface ICachedCoursesStorage {
  lastUpdatedAt: number,
  courses: CourseInfo[] | undefined
}

export class CachedCoursesStore {
  static get = singletonGetter(CachedCoursesStore);

  @observable
  coursesStorageResponse?: IPromiseBasedObservable<ICachedCoursesStorage>;

  @computed
  get isLoading() {
    return this.coursesStorageResponse?.state === PENDING;
  }

  @computed
  get error(): string | undefined {
    return this.coursesStorageResponse?.case({
      rejected: e => e.toString()
    });
  }

  @computed
  get courses(): CourseInfo[] {
    return this.coursesStorageResponse?.case({
      fulfilled: t => t.courses,
    }) ?? [];
  }

  @computed
  private get coursesMap(): { [code: string]: CourseInfo } {
    const _courseMap: { [code: string]: CourseInfo } = {};
    for (const course of this.courses ?? []) {
      _courseMap[course.code] = course;
    }
    return _courseMap;
  }

  getByCode(courseCode: string): CourseInfo | undefined {
    return this.coursesMap[courseCode];
  }

  constructor() {
    makeAutoObservable(this);
  }

  @action
  init() {
    this.coursesStorageResponse = fromPromise(
      this.initialize()
    );
  }

  private initialize(): Promise<ICachedCoursesStorage> {
    const courseJson = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
    const parsedCachedCoursesStorage = courseJson
      ? JSON.parse(courseJson) as ICachedCoursesStorage
      : null;

    if (
      !courseJson ||
      !parsedCachedCoursesStorage ||
      (
        parsedCachedCoursesStorage.lastUpdatedAt +
        COURSES_INFO_REFRESH_TIME
      ) < CachedCoursesStore.getCurrentTimestamp()
    ) {
      return this.fetchFromServer();
    } else {
      return Promise.resolve(parsedCachedCoursesStorage);
    }
  }

  private async fetchFromServer(): Promise<ICachedCoursesStorage> {
    return new Promise(((resolve, reject) => {
      searchCourses(buildProto<SearchCourseRequest>({
        pagination: {
          zeroBasedPage: 0,
          limit: 5000
        },
        basicInfoOnly: true
      }))
        .then(res => {
          const courseStorage = buildProto<ICachedCoursesStorage>({
            lastUpdatedAt: CachedCoursesStore.getCurrentTimestamp(),
            courses: SearchCourseResponse.fromJSON(res).results
          });
          localStorage.setItem(
            LOCAL_STORAGE_COURSES_KEY,
            JSON.stringify(courseStorage)
          );
          return resolve(courseStorage);
        })
        .catch(error => {
          return reject(error);
        });
    }));
  }

  private static getCurrentTimestamp(): number {
    return new Date().getTime();
  }
}
