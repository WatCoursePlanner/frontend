import { COURSES_INFO_REFRESH_TIME, URL_BASE } from "@watcourses/constants/api";
import { CourseInfo, SearchCourseResponse } from "@watcourses/proto/courses";

type CachedCoursesStorage = {
    lastUpdatedAt: number,
    courses: CourseInfo[]
}

export class CachedCourses {
    private static courses: CachedCoursesStorage | null
    private static coursesMap: { [code: string]: CourseInfo } = {}
    private static notInitialized = true

    static get(): CourseInfo[] {
        return this.courses?.courses ?? []
    }

    static async initialize(): Promise<boolean> {
        if (!this.notInitialized) {
            return false
        }
        this.notInitialized = false

        const courseJson = await localStorage.getItem("courses")
        const parsedCachedCoursesStorage = courseJson === null ? null : JSON.parse(courseJson) as CachedCoursesStorage

        if (!courseJson || !parsedCachedCoursesStorage ||
            parsedCachedCoursesStorage.lastUpdatedAt + COURSES_INFO_REFRESH_TIME < CachedCourses.getCurrentTimestamp()
        ) {
            await this.fetchFromServer()
        } else {
            this.courses = parsedCachedCoursesStorage
        }
        this.initializeCoursesMap()
        return true
    }

    private static async fetchFromServer() {
        const result = await fetch(`${URL_BASE}/course/search/`, {
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
        const res = await result.json()

        if (res.error) {
            throw res.error
        }
        this.courses = {
            lastUpdatedAt: CachedCourses.getCurrentTimestamp(),
            courses: SearchCourseResponse.fromJSON(res).results
        }
        await localStorage.setItem("courses", JSON.stringify(
            {
                lastUpdatedAt: CachedCourses.getCurrentTimestamp(),
                courses: res.results
            }
        ))
    }

    static getByCode(courseCode: string): CourseInfo | null {
        return this.coursesMap[courseCode] ?? null
    }

    private static initializeCoursesMap() {
        for (const course of this.courses!.courses) {
            this.coursesMap[course.code] = course
        }
    }

    private static getCurrentTimestamp(): number {
        return new Date().getTime()
    }
}
