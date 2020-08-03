import {
    BatchGetCourseRequest,
    CreateStudentProfileRequest,
    Schedule_TermSchedule,
    StudentProfile
} from "../../proto/courses";
import {Dispatch} from "redux";
import {fetchProfileCourseAction, shouldFetchProfileCourse} from "./profileCourses";
import {store} from "../store";
import {URL_BASE} from "../../constants/api";

export const STUDENT_PROFILE_INIT = 'STUDENT_PROFILE_INIT';
export const STUDENT_PROFILE_SUCCESS = 'STUDENT_PROFILE_SUCCESS';
export const STUDENT_PROFILE_ERROR = 'STUDENT_PROFILE_ERROR';
export const STUDENT_PROFILE_ADD_COURSE = 'STUDENT_PROFILE_ADD_COURSE';
export const STUDENT_PROFILE_REMOVE_COURSE = 'STUDENT_PROFILE_REMOVE_COURSE';

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

export type StudentProfileRemove = {
    type: typeof STUDENT_PROFILE_REMOVE_COURSE,
    termName: string,
    index: number,
};

export const studentProfileRemoveCourse = (termName: string, index: number) => ({
    type: STUDENT_PROFILE_REMOVE_COURSE,
    termName,
    index
})

export type StudentProfileAdd = {
    type: typeof STUDENT_PROFILE_ADD_COURSE,
    termName: string,
    index: number,
    code: string
};

export const studentProfileAddCourse = (termName: string, index: number, code: string) => ({
    type: STUDENT_PROFILE_ADD_COURSE,
    termName,
    index,
    code
})

export const fetchStudentProfileAction = (request: CreateStudentProfileRequest) => {
    return (dispatch: Dispatch) => {
        dispatch(studentProfileInit());
        fetch(URL_BASE + '/profile/create', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
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
                            .filter((code: string) => shouldFetchProfileCourse(store.getState(), code))
                    fetchProfileCourseAction(request)(dispatch);
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
    | StudentProfileAdd
    | StudentProfileRemove
