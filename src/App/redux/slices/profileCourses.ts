import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_BASE } from "@watcourses/constants/api";
import { CheckResults, CheckResults_Issue, CourseInfo, StudentProfile } from "@watcourses/proto/courses";

import { RootState } from "../store";

export type ProfileCoursesState = {
    readonly courses: { [courseCode: string]: CourseInfo },
    readonly issues: CheckResults_Issue[],
    readonly error: string | null,
    readonly loading: boolean,
};

export const fetchProfileCourseAction = createAsyncThunk(
    'profileCourses/fetchProfileCourseAction',
    async (profile: StudentProfile | null, {getState, dispatch}) => {
        const resp = await fetch(`${URL_BASE}/profile/check`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(StudentProfile.toJSON(profile ?? (getState() as RootState).studentProfile.content!))
        })

        const res = await resp.json()

        if (res.error) {
            throw res.error
        }

        dispatch(profileCourses.actions.setCheckResults(res))
    }
)

const profileCourses = createSlice({
    name: 'profileCourses',
    initialState: {
        issues: [],
        courses: {},
        error: null,
        loading: false,
    } as ProfileCoursesState,
    reducers: {
        profileCourseInit: (state: ProfileCoursesState) => ({...state, loading: true}),

        setCheckResults: (state: ProfileCoursesState, action: PayloadAction<CheckResults>) => {
            const courses: { [courseCode: string]: CourseInfo } = {}
            for (const c of action.payload.checkedCourses) {
                courses[c.code] = c
            }
            return {
                ...state,
                loading: false,
                issues: action.payload.issues,
                courses
            };
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchProfileCourseAction.pending, (state: ProfileCoursesState, action) => ({
            ...state,
            loading: true
        }))
    }
})

export default profileCourses
