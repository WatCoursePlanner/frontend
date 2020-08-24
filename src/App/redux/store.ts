import {configureStore} from "@reduxjs/toolkit";
import profileCourses from "./slices/profileCourses";
import studentProfile from "./slices/studentProfile";
import search from "./slices/search";

export const store = configureStore({
    reducer: {
        profileCourses: profileCourses.reducer,
        studentProfile: studentProfile.reducer,
        search: search.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>
