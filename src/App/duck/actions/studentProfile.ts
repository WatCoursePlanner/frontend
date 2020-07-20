import {
    BatchGetCourseRequest,
    CreateStudentProfileRequest,
    Schedule_TermSchedule,
    StudentProfile
} from "../../proto/courses";
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

export const fetchStudentProfileAction = (request: CreateStudentProfileRequest) => {
    return (dispatch: Dispatch) => {
        dispatch(studentProfileInit());
        fetch(URL_BASE + '/profile/create', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(CreateStudentProfileRequest.toJSON(request))
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) throw(res.error);
                dispatch(studentProfileSuccess(res));
                if (res.schedule.terms.length > 0) {
                    let request = BatchGetCourseRequest.fromJSON("")
                    request.courseCodes =
                        // Flattening array with concat
                        Array.prototype.concat.apply([],
                            res.schedule.terms.map((term: Schedule_TermSchedule) => term.courseCodes))
                        .filter((code: string) => shouldFetchCourse(store.getState(), code))
                    fetchCourseAction(request)(dispatch);
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
