import {RootAction} from "../actions";
import {CourseInfo, PaginationInfoResponse} from "../../proto/courses";
import {SEARCH_ERROR, SEARCH_INIT, SEARCH_SUCCESS} from "../actions/search";

export type SearchState = {
    readonly content: CourseInfo[],
    readonly pagination: PaginationInfoResponse | null,
    readonly error: string | null,
    readonly loading: boolean,
};

const initialState = {
    content: [],
    pagination: null,
    error: null,
    loading: false,
};

const searchReducer = (
    state: SearchState = initialState,
    action: RootAction
): SearchState => {
    switch (action.type) {
        case SEARCH_INIT:
            return {...state, loading: true};
        case SEARCH_SUCCESS:
            const courses: CourseInfo[] = action.payload ?? [];
            if (courses.length > 0) {
                return {
                    ...state,
                    loading: false,
                    content: courses,
                    pagination: action.pagination,
                };
            }
            return state;
        case SEARCH_ERROR:
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

export default searchReducer
