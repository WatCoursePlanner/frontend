import {RootAction} from "../actions";
import {CourseInfo} from "../../proto/courses";
import {COURSE_ERROR, COURSE_INIT, COURSE_SUCCESS} from "../actions/courses";

export type CoursesState = {
    readonly content: CourseInfo[],
    readonly error: string | null,
    readonly loading: boolean,
};

const initialState = {
    content: [],
    error: null,
    loading: false,
};

const coursesReducer = (
    state: CoursesState = initialState,
    action: RootAction
): CoursesState => {
    switch (action.type) {
        case COURSE_INIT:
            return {...state, loading: true};
        case COURSE_SUCCESS:
            const courses: CourseInfo[] = action.payload ?? [];
            if (courses.length > 0) {
                return {
                    ...state,
                    loading: false,
                    content: courses,
                };
            }
            return state;
        case COURSE_ERROR:
            const error: string = action.payload;
            return {
                ...state,
                loading: false,
                error: error,
            };
        default:
            return state;
    }
}

export default coursesReducer
