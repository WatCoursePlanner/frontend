import {
    BatchGetCourseRequest,
    BatchGetCourseResponse,
    CourseInfo,
} from "../../proto/courses";
import {Dispatch} from "redux";
import {RootState} from "../types";
import {URL_BASE} from "../../constants/api";

export const ADD_PROFILE_COURSE = 'ADD_PROFILE_COURSE';
export const PROFILE_COURSE_INIT = 'PROFILE_COURSE_INIT';

type AddProfileCourse = {
    type: typeof ADD_PROFILE_COURSE,
    payload: CourseInfo[],
};
type ProfileCourseInit = {
    type: typeof PROFILE_COURSE_INIT,
};

export const addProfileCourse = (courses: CourseInfo[]) => ({type: ADD_PROFILE_COURSE, payload: courses});

export const profileCourseInit = (): ProfileCourseInit => ({
    type: PROFILE_COURSE_INIT
});

export const fetchProfileCourseAction = (request: BatchGetCourseRequest) => {
    return (dispatch: Dispatch) => {
        dispatch(profileCourseInit());
        fetch(URL_BASE + '/course/batch/', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(BatchGetCourseRequest.toJSON(request))
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw(res.error)
                dispatch(addProfileCourse(BatchGetCourseResponse.fromJSON(res).results))
                return res;
            })
            .catch(error => {
                throw(error)
            });
    }
}

export const shouldFetchProfileCourse = (state: RootState, code: string) => {
    const profileCourse = state.profileCourses.content[code]
    if (!profileCourse) {
        return true
    } else return !state.profileCourses.loading;
}

export type ProfileCourseTypes =
    | AddProfileCourse
    | ProfileCourseInit
