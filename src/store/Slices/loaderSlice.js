import { createSlice } from "@reduxjs/toolkit";

let initialState = { visibility: false };

const loaderSlice = createSlice({
    name: "Loader",
    initialState,
    reducers: {
        toggleLoaderVisibility: (state, action) => {
            state.visibility = action.payload;
        }
    }
});

const { reducer, actions } = loaderSlice;
const { toggleLoaderVisibility } = actions;

export default reducer;
export { toggleLoaderVisibility };