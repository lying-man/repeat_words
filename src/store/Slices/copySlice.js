import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    visible: false,
    currentCopyData: null,
};

const copySlice = createSlice({
    name: "copy",
    initialState,
    reducers: {
        setVisibilityCopyModal(state, action) {
            state.visible = action.payload;
        },
        setCurrentCopyData(state, action) {
            state.currentCopyData = action.payload;
        }
    }
});

const { reducer, actions } = copySlice;
const { setVisibilityCopyModal, setCurrentCopyData } = actions;

export default reducer;
export { setCurrentCopyData, setVisibilityCopyModal };