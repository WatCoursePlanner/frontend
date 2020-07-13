import {StudentProfile} from "../../proto/courses_pb";

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
    payload: StudentProfile.AsObject,
};
export const studentProfileSuccess = (studentProfile: StudentProfile.AsObject): StudentProfileSuccess => ({
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

export type StudentProfileTypes =
    | StudentProfileInit
    | StudentProfileSuccess
    | StudentProfileError
