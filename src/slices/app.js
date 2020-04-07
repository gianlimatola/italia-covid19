import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    headerSubTitle: ""
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setHeaderSubTitle: (state, { payload }) => {
            state.headerSubTitle = payload;
        }
    }
});

export const { setHeaderSubTitle } = appSlice.actions;

export const appSelector = state => state.app;

export default appSlice.reducer;

export function changeHeaderSubTitle(subTitle) {
    return dispatch => {
        dispatch(setHeaderSubTitle(subTitle));
    };
}
