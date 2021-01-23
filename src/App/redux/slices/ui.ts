import { createSlice } from "@reduxjs/toolkit";

export type UIState = {
    readonly drawerShadow: boolean,
    readonly shortlistOpen: boolean,
};

const ui = createSlice({
    name: 'ui',
    initialState: {
        drawerShadow: false,
        shortlistOpen: false,
    } as UIState,
    reducers: {
        setDrawerShadow: ((state, action) => {
            state.drawerShadow = action.payload
        }),
        setShortlistOpen: ((state, action) => {
            state.shortlistOpen = action.payload
        }),
    },
})

export default ui
