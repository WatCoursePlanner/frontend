import {createSlice} from "@reduxjs/toolkit";

export type UIState = {
    readonly drawerShadow: boolean,
};

const ui = createSlice({
    name: 'ui',
    initialState: {
        drawerShadow: false,
    } as UIState,
    reducers: {
        setDrawerShadow: ((state, action) => {
            state.drawerShadow = action.payload
        })
    },
})

export default ui
