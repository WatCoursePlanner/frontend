import {configureStore} from "@reduxjs/toolkit";
import profileCourses from "./slices/profileCourses";
import studentProfile from "./slices/studentProfile";
import search from "./slices/search";
import ui from "./slices/ui";

export const store = configureStore({
    reducer: {
        profileCourses: profileCourses.reducer,
        studentProfile: studentProfile.reducer,
        search: search.reducer,
        ui: ui.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
