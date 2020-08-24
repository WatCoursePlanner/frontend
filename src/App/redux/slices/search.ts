import {CourseInfo, PaginationInfoResponse, SearchCourseRequest, SearchCourseResponse} from "../../proto/courses";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {URL_BASE} from "../../constants/api";

export type SearchState = {
    readonly content: CourseInfo[],
    readonly pagination: PaginationInfoResponse | null,
    readonly error: string | null,
    readonly loading: boolean,
};

export const doSearch = createAsyncThunk(
    'search/doSearch',
    async (request: SearchCourseRequest, thunkAPI) => {
        const resp = await fetch(URL_BASE + "/course/search/", {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(SearchCourseRequest.toJSON(request))
        })

        const res = await resp.json()

        if (res.error) throw res.error

        return res
    }
)

const search = createSlice({
    name: 'search',
    initialState: {
        content: [],
        pagination: null,
        error: null,
        loading: false,
    } as SearchState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(doSearch.pending, (state: SearchState, action) => ({...state, loading: true}))
        builder.addCase(doSearch.fulfilled, (state: SearchState, action: PayloadAction<SearchCourseResponse>) => {
            const courses: CourseInfo[] = action.payload.results ?? [];
            if (courses.length > 0) {
                return {
                    ...state,
                    loading: false,
                    content: courses,
                    pagination: action.payload.pagination,
                } as SearchState
            }
            return state;
        })
        builder.addCase(doSearch.rejected, (state: SearchState, action) => ({
            ...state,
            loading: false,
            error: action.payload
        } as SearchState))
    }
})

export default search