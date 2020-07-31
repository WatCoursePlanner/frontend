import {
    CourseInfo, PaginationInfoResponse, SearchCourseRequest,
    SearchCourseResponse,
} from "../../proto/courses";
import {Dispatch} from "redux";
import {RootState} from "../types";
import {URL_BASE} from "../../constants/api";

export const SEARCH_INIT = 'SEARCH_INIT';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_ERROR = 'SEARCH_ERROR';

type SearchInit = {
    type: typeof SEARCH_INIT,
};

type SearchSuccess = {
    type: typeof SEARCH_SUCCESS,
    payload: CourseInfo[],
    pagination: PaginationInfoResponse
};

type SearchError = {
    type: typeof SEARCH_ERROR,
    payload: string,
};

export const searchInit = (): SearchInit => ({
    type: SEARCH_INIT
});

export const searchSuccess = (response: SearchCourseResponse): SearchSuccess => ({
    type: SEARCH_SUCCESS,
    payload: response.results,
    pagination: response.pagination!!
});

export const searchError = (error: string): SearchError => ({
    type: SEARCH_ERROR,
    payload: error
});

export const doSearchAction = (request: SearchCourseRequest) => {
    return (dispatch: Dispatch) => {
        dispatch(searchInit());
        fetch(URL_BASE + "/course/search/", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(SearchCourseRequest.toJSON(request))
        })
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    dispatch(searchError(res.error))
                }
                dispatch(searchSuccess(SearchCourseResponse.fromJSON(res)));
            })
            .catch(error => dispatch(searchError(error)))
    }
}

export type SearchTypes =
    | SearchInit
    | SearchError
    | SearchSuccess
