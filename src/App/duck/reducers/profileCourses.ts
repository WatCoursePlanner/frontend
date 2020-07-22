import {RootAction} from "../actions";
import {CourseInfo} from "../../proto/courses";
import {ADD_PROFILE_COURSE, PROFILE_COURSE_INIT} from "../actions/profileCourses";

export type ProfileCoursesState = {
    readonly content: { [courseCode: string]: CourseInfo },
    readonly error: string | null,
    readonly loading: boolean,
};

const initialState = {
    content: {},
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
        case ADD_PROFILE_COURSE:
            const courses: CourseInfo[] = action.payload;
            if (courses.length > 0) {
                return {
                    ...state,
                    loading: false,
                    content: {
                        ...state.content,
                        ...courses.reduce((o, course) =>
                            ({...o, [course.code]: course}), {})
                    },
                };
            }
            return state;

        default:
            return state;
    }
}

export default profileCoursesReducer
