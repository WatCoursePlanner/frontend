import { configureStore } from "@reduxjs/toolkit";
import { loadStudentProfile } from "@watcourses/utils/LocalStorage";

import profileCourses from "./slices/profileCourses";
import search from "./slices/search";
import studentProfileSlice from "./slices/studentProfileSlice";
import ui from "./slices/ui";

export const store = (async () => configureStore({
    reducer: {
        profileCourses: profileCourses.reducer,
        studentProfile: studentProfileSlice.reducer,
        search: search.reducer,
        ui: ui.reducer,
    },
    // preloadedState: await loadStudentProfile()
}))()

const getState = (async () => (await store).getState())
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type RootState = ThenArg<ReturnType<typeof getState>>
