import {RootAction} from "../actions";
import {StudentProfile} from "../../proto/courses";
import {
    STUDENT_PROFILE_ADD_COURSE,
    STUDENT_PROFILE_ADD_SHORTLIST,
    STUDENT_PROFILE_ERROR,
    STUDENT_PROFILE_INIT,
    STUDENT_PROFILE_REMOVE_COURSE,
    STUDENT_PROFILE_REMOVE_SHORTLIST,
    STUDENT_PROFILE_SUCCESS
} from "../actions/studentProfile";
import _ from 'lodash';

export type StudentProfileState = {
    readonly content: StudentProfile | null,
    readonly error: string | null,
    readonly loading: boolean,
};

const initialState = {
    content: null,
    error: null,
    loading: false,
};

const studentProfileReducer = (
    state: StudentProfileState = initialState,
    action: RootAction
): StudentProfileState => {

    switch (action.type) {

        case STUDENT_PROFILE_INIT:
            return {...state, loading: true};

        case STUDENT_PROFILE_SUCCESS:
            const studentProfile: StudentProfile = action.payload;
            if (studentProfile) {
                return {
                    ...state,
                    loading: false,
                    content: studentProfile,
                };
            }
            return state;

        case STUDENT_PROFILE_ERROR:
            const error: string = action.payload;
            return {
                ...state,
                loading: false,
                error: error,
            };

        case STUDENT_PROFILE_REMOVE_COURSE:
            const doRemoveCourse = () => {
                const index = action.index;
                const newProfile = state.content!!
                const term = newProfile.schedule!!.terms.find((term) => term!!.termName === action.termName)!!
                const codes = term.courseCodes
                if (index !== null) codes.splice(index, 1)
                return newProfile
            }
            return {
                ...state,
                content: _.cloneDeep(doRemoveCourse())
            };

        case STUDENT_PROFILE_ADD_COURSE:
            const doAddCourse = () => {
                const index = action.index;
                const newProfile = state.content!!
                const term = newProfile.schedule!!.terms.find((term) => term!!.termName === action.termName)!!
                const codes = term.courseCodes
                if (index !== null) codes.splice(index, 0, action.code);
                return newProfile
            }
            return {
                ...state,
                content: _.cloneDeep(doAddCourse())
            };

        case STUDENT_PROFILE_ADD_SHORTLIST:
            if (action.index === null)
                state.content!!.shortList.push(action.code)
            else
                state.content!!.shortList.splice(action.index, 0, action.code)
            return {
                ...state,
                content: _.cloneDeep(state.content)
            };

        case STUDENT_PROFILE_REMOVE_SHORTLIST:
            state.content!!.shortList = state.content!!.shortList.filter((code) => code !== action.code)
            return {
                ...state,
                content: _.cloneDeep(state.content)
            };

        default:
            return state;
    }
}

export default studentProfileReducer
