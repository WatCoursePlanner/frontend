import {StudentProfile} from "../../proto/courses";
import {Dispatch} from "redux";
import {fetchCourseAction, shouldFetchCourse} from "./courses";
import {store} from "../store";
import {URL_BASE} from "../../constants/api";

export const STUDENT_PROFILE_INIT = 'STUDENT_PROFILE_INIT';
export const STUDENT_PROFILE_SUCCESS = 'STUDENT_PROFILE_SUCCESS';
export const STUDENT_PROFILE_ERROR = 'STUDENT_PROFILE_ERROR';

type StudentProfileInit = {
    type: typeof STUDENT_PROFILE_INIT,
};
export const studentProfileInit = (): StudentProfileInit => ({
    type: STUDENT_PROFILE_INIT
});

type StudentProfileSuccess = {
    type: typeof STUDENT_PROFILE_SUCCESS,
    payload: StudentProfile,
};
export const studentProfileSuccess = (studentProfile: StudentProfile): StudentProfileSuccess => ({
    type: STUDENT_PROFILE_SUCCESS,
    payload: studentProfile
});

type StudentProfileError = {
    type: typeof STUDENT_PROFILE_ERROR,
    payload: string,
};
export const studentProfileError = (error: string): StudentProfileError => ({
    type: STUDENT_PROFILE_ERROR,
    payload: error
});

export const fetchStudentProfileAction = () => {
    return (dispatch: Dispatch) => {
        dispatch(studentProfileInit());
        fetch(URL_BASE +
            '/profile/default?program=Software%20Engineering')
            .then(res => res.json())
            .then(res => {
                if (res.error) throw(res.error);
                dispatch(studentProfileSuccess(res));
                if (res.schedule.terms.length > 0) {
                    for (const term of res.schedule.terms) {
                        for (const code of term.courseCodes) {
                            if (shouldFetchCourse(store.getState(), code))
                                fetchCourseAction(code)(dispatch);
                        }
                    }
                }
                return res
            })
            .catch(error => dispatch(studentProfileError(error)));
    }
}

export type StudentProfileTypes =
    | StudentProfileInit
    | StudentProfileSuccess
    | StudentProfileError
