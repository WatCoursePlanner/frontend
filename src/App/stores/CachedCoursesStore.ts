import { action, computed, observable } from "mobx";
import { fromPromise, IPromiseBasedObservable, PENDING } from "mobx-utils";

import { COURSES_INFO_REFRESH_TIME, URL_BASE } from "../constants/api";
import { CourseInfo, SearchCourseResponse } from "../proto/courses";
import { singletonGetter } from "../utils/SingletonGetter";

const LOCAL_STORAGE_COURSES_KEY = "LOCAL_STORAGE_COURSES_KEY"

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
    })
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

  @action
  init() {
    this.coursesStorageResponse = fromPromise(
      this.initialize()
    );
  }

  private initialize(): Promise<ICachedCoursesStorage> {
    const courseJson = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
    const parsedCachedCoursesStorage =
      courseJson === null
        ? null
        : JSON.parse(courseJson) as ICachedCoursesStorage;

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
      fetch(`${URL_BASE}/course/search/`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          pagination: {
            zeroBasedPage: 0,
            limit: 5000
          },
          basicInfoOnly: true
        })
      })
        .then(response => response.json())
        .then(res => {
          if (res.error) {
            throw res.error;
          }
          const courseStorage = {
            lastUpdatedAt: CachedCoursesStore.getCurrentTimestamp(),
            courses: SearchCourseResponse.fromJSON(res).results
          };
          localStorage.setItem(
            LOCAL_STORAGE_COURSES_KEY,
            JSON.stringify(courseStorage)
          );
          return resolve(courseStorage);
        })
        .catch(error => {
          return reject(error)
        });
    }))
  }

  private static getCurrentTimestamp(): number {
    return new Date().getTime();
  }
}
