import {configureStore} from "@reduxjs/toolkit";
import profileCourses from "./slices/profileCourses";
import studentProfile from "./slices/studentProfile";
import search from "./slices/search";
import ui from "./slices/ui";
import {loadState} from "../utils/LocalStorage";

export const store = (async () => configureStore({
    reducer: {
        profileCourses: profileCourses.reducer,
        studentProfile: studentProfile.reducer,
        search: search.reducer,
        ui: ui.reducer,
    },
    preloadedState: await loadState()
}))()

const getState = (async () => (await store).getState())
type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
export type RootState = ThenArg<ReturnType<typeof getState>>
