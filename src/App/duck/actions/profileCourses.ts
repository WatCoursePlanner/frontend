import {CheckResults, StudentProfile,} from "../../proto/courses";
import {Dispatch} from "redux";
import {RootState} from "../types";
import {URL_BASE} from "../../constants/api";

export const SET_CHECK_RESULTS = 'SET_CHECK_RESULTS';
export const PROFILE_COURSE_INIT = 'PROFILE_COURSE_INIT';

type SetCheckResults = {
    type: typeof SET_CHECK_RESULTS,
    payload: CheckResults,
};
type ProfileCourseInit = {
    type: typeof PROFILE_COURSE_INIT,
};

export const setCheckResults = (result: CheckResults) => ({type: SET_CHECK_RESULTS, payload: result});

export const profileCourseInit = (): ProfileCourseInit => ({
    type: PROFILE_COURSE_INIT
});

export const fetchProfileCourseAction = (profile: StudentProfile) => {
    return (dispatch: Dispatch) => {
        dispatch(profileCourseInit());
        fetch(URL_BASE + '/profile/check', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(StudentProfile.toJSON(profile))
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw(res.error)
                dispatch(setCheckResults(CheckResults.fromJSON(res)))
                return res;
            })
            .catch(error => {
                throw(error)
            });
    }
}

export const shouldFetchProfileCourse = (state: RootState, code: string) => {
    const profileCourse = state.profileCourses.courses[code]
    if (!profileCourse) {
        return true
    } else return !state.profileCourses.loading;
}

export type ProfileCourseTypes =
    | SetCheckResults
    | ProfileCourseInit
