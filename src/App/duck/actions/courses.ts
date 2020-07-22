import {
    CourseInfo, SearchCourseRequest,
    SearchCourseResponse,
} from "../../proto/courses";
import {Dispatch} from "redux";
import {RootState} from "../types";
import {URL_BASE} from "../../constants/api";

export const COURSE_INIT = 'COURSE_INIT';
export const COURSE_SUCCESS = 'COURSE_SUCCESS';
export const COURSE_ERROR = 'COURSE_ERROR';

type CourseInit = {
    type: typeof COURSE_INIT,
};

type CourseSuccess = {
    type: typeof COURSE_SUCCESS,
    payload: CourseInfo[],
};

type CourseError = {
    type: typeof COURSE_ERROR,
    payload: string,
};

export const courseInit = (): CourseInit => ({
    type: COURSE_INIT
});

export const courseSuccess = (courses: CourseInfo[]): CourseSuccess => ({
    type: COURSE_SUCCESS,
    payload: courses
});
export const courseError = (error: string): CourseError => ({
    type: COURSE_ERROR,
    payload: error
});

export const fetchCoursesAction = (request: SearchCourseRequest) => {
    return (dispatch: Dispatch) => {
        dispatch(courseInit());
        fetch(URL_BASE + "/course/search/", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(SearchCourseRequest.toJSON(request))
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    dispatch(courseError(res.error))
                }
                dispatch(courseSuccess(SearchCourseResponse.fromJSON(res).results));
            })
            .catch(error => dispatch(courseError(error)))
    }
}

export type CourseTypes =
    | CourseInit
    | CourseError
    | CourseSuccess
