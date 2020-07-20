import {BatchGetCourseRequest, BatchGetCourseResponse, CourseInfo} from "../../proto/courses";
import {Dispatch} from "redux";
import {RootState} from "../types";
import {URL_BASE} from "../../constants/api";

export const ADD_COURSE = 'ADD_COURSE';
export const COURSE_INIT = 'COURSE_INIT';
export const COURSE_FETCH = 'COURSE_FETCH';
export const COURSE_SUCCESS = 'COURSE_SUCCESS';
export const COURSE_ERROR = 'COURSE_ERROR';

type AddCourse = {
    type: typeof ADD_COURSE,
    payload: CourseInfo[],
};
export const addCourse = (story: CourseInfo[]) => ({type: ADD_COURSE, payload: story});

type CourseInit = {
    type: typeof COURSE_INIT,
};

export const courseInit = (): CourseInit => ({
    type: COURSE_INIT
});

export const fetchBatchCourseAction = (request: BatchGetCourseRequest) => {
    return (dispatch: Dispatch) => {
        dispatch(courseInit());
        fetch(URL_BASE + '/course/batch/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(BatchGetCourseRequest.toJSON(request))
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw(res.error)
                dispatch(addCourse(BatchGetCourseResponse.fromJSON(res).results))
                return res;
            })
            .catch(error => {
                throw(error)
            });
    }
}

export const shouldFetchCourse = (state: RootState, code: string) => {
    const course = state.courses.content[code]
    if (!course) {
        return true
    } else return !state.courses.loading;
}

export type CourseTypes =
    | AddCourse
    | CourseInit
