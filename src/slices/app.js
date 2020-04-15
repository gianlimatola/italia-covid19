import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    headerSubTitle: "",
    closeButton: false,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setHeaderSubTitle: (state, { payload }) => {
            state.headerSubTitle = payload;
        },
        showCloseButton: (state) => {
            state.closeButton = true;
        },
        hideCloseButton: (state) => {
            state.closeButton = false;
        },
    },
});

export const { setHeaderSubTitle, showCloseButton, hideCloseButton } = appSlice.actions;

export const appSelector = (state) => state.app;

export default appSlice.reducer;

export function changeHeaderSubTitle(subTitle) {
    return (dispatch) => {
        dispatch(setHeaderSubTitle(subTitle));
    };
}

export function changeCloseButtonVisibility(visibility) {
    if (visibility) {
        return (dispatch) => {
            dispatch(showCloseButton());
        };
    } else {
        return (dispatch) => {
            dispatch(hideCloseButton());
        };
    }
}
