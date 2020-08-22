import {RootAction} from "../actions";
import {CheckResults_Issue, CourseInfo} from "../../proto/courses";
import {PROFILE_COURSE_INIT, SET_CHECK_RESULTS} from "../actions/profileCourses";

export type ProfileCoursesState = {
    readonly courses: { [courseCode: string]: CourseInfo },
    readonly issues: CheckResults_Issue[],
    readonly error: string | null,
    readonly loading: boolean,
};

const initialState = {
    issues: [],
    courses: {},
    error: null,
    loading: false,
};

const profileCoursesReducer = (
    state: ProfileCoursesState = initialState,
    action: RootAction
): ProfileCoursesState => {
    switch (action.type) {
        case PROFILE_COURSE_INIT:
            return {...state, loading: true};
        case SET_CHECK_RESULTS:
            let courses: { [courseCode: string]: CourseInfo } = {}
            for (const c of action.payload.checkedCourses){
                courses[c.code] = c
            }
            return {
                ...state,
                loading: false,
                issues: action.payload.issues,
                courses: courses
            };

        default:
            return state;
    }
}

export default profileCoursesReducer
