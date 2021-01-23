import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { URL_BASE } from "@watcourses/constants/api";
import { CreateStudentProfileRequest, StudentProfile } from "@watcourses/proto/courses";

import { fetchProfileCourseAction } from "./profileCourses";

export type StudentProfileState = {
    readonly content: StudentProfile | null,
    readonly error: string | null,
    readonly loading: boolean,
};

export const fetchStudentProfileAction = createAsyncThunk(
    'studentProfile/fetchStudentProfile',
    async (request: CreateStudentProfileRequest, thunkAPI) => {
        const resp = await fetch(`${URL_BASE}/profile/create`, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(CreateStudentProfileRequest.toJSON(request))
        })

        const profile = await resp.json()

        if (profile.error) { throw profile.error }

        thunkAPI.dispatch(fetchProfileCourseAction(profile))
        return profile
    }
)

const studentProfileSlice = createSlice({
    name: 'studentProfile',
    initialState: {
        content: null,
        error: null,
        loading: false,
    } as StudentProfileState,
    reducers: {
        removeCourse: (state: StudentProfileState, action: PayloadAction<{
            termName: string,
            index: number
        }>) => {
            const index = action.payload.index;
            const newProfile = state.content!!
            const term = newProfile.schedule!!.terms.find((term) =>
                term!!.termName === action.payload.termName
            )!
            if (index !== null) { term.courseCodes.splice(index, 1) }
        },

        addCourse: (state: StudentProfileState, action: PayloadAction<{
            termName: string,
            index: number,
            code: string
        }>) => {
            const index = action.payload.index;
            const newProfile = state.content!!
            const term = newProfile.schedule!!.terms.find((_term) =>
                _term!!.termName === action.payload.termName
            )!
            if (index !== null) { term.courseCodes.splice(index, 0, action.payload.code); }
        },

        addShortlist: (state: StudentProfileState, action: PayloadAction<{ index: number | null, code: string }>) => {
            if (action.payload.index === null) {
                state.content!!.shortList.push(action.payload.code)
            } else {
                state.content!!.shortList.splice(action.payload.index, 0, action.payload.code)
            }
        },

        removeShortlist: (state: StudentProfileState, action: PayloadAction<{ code: string }>) => {
            state.content!!.shortList = state.content!!.shortList.filter((code) => code !== action.payload.code)
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchStudentProfileAction.pending, (state: StudentProfileState, action) => ({
            ...state,
            loading: true
        }))
        builder.addCase(fetchStudentProfileAction.fulfilled, (state: StudentProfileState, action: PayloadAction<StudentProfile>) => ({
            ...state,
            content: action.payload,
            loading: false
        }))
        builder.addCase(fetchStudentProfileAction.rejected, (state: StudentProfileState, action) => ({
            ...state,
            loading: false,
            error: action.payload
        }) as StudentProfileState)
    }
})
export default studentProfileSlice
