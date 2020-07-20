import {RootAction} from "../actions";
import {CourseInfo} from "../../proto/courses";
import {ADD_COURSE, COURSE_INIT} from "../actions/courses";

export type CoursesState = {
    readonly content: { [courseCode: string]: CourseInfo },
    readonly error: string | null,
    readonly loading: boolean,
};

const initialState = {
    content: {},
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

        case ADD_COURSE:
            const courses: CourseInfo[] = action.payload;
            if (courses.length > 0) {
                return {
                    ...state,
                    loading: false,
                    content: {...state.content,
                        ...courses.reduce((o, course) =>
                            ({ ...o, [course.code]: course}), {})},
                };
            }
            return state;

        default:
            return state;
    }
}

export default coursesReducer
