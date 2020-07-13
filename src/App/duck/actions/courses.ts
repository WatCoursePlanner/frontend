import {CourseInfo} from "../../proto/courses_pb";
import {Dispatch} from "redux";
import {snakeToCamelCase} from "../../utils/apiUtils";
import {RootState} from "../types";

export const ADD_COURSE = 'ADD_COURSE';
export const COURSE_INIT = 'COURSE_INIT';
export const COURSE_FETCH = 'COURSE_FETCH';
export const COURSE_SUCCESS = 'COURSE_SUCCESS';
export const COURSE_ERROR = 'COURSE_ERROR';

type AddCourse = {
    type: typeof ADD_COURSE,
    payload: CourseInfo.AsObject,
};
export const addCourse = (story: CourseInfo.AsObject) => ({ type: ADD_COURSE, payload: story });

type CourseInit = {
    type: typeof COURSE_INIT,
};
export const courseInit = (): CourseInit => ({
    type: COURSE_INIT
});

export const fetchCourseAction = (code: string) => {
    return (dispatch: Dispatch) => {
        dispatch(courseInit());
        fetch('https://watcourses.com/api/course/' + encodeURI(code))
            .then(res => res.json())
            .then(res => {
                if (res.error) throw(res.error);
                res = snakeToCamelCase(res) as CourseInfo.AsObject
                dispatch(addCourse(res));
                return res;
            })
            .catch(error => {throw(error)});
    }
}


// function shouldFetchCourse(state: RootState, code: string) {
//     const posts = state.courses[code]
//     if (!posts) {
//         return true
//     } else if (posts.isFetching) {
//         return false
//     } else {
//         return posts.didInvalidate
//     }
// }

export type CourseTypes =
    | AddCourse
    | CourseInit
