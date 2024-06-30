import { createSlice } from "@reduxjs/toolkit";
import { statisticStorage } from "../../utils/statisticStorage";

const savedState = statisticStorage("get");
const currentDate = new Date().toLocaleDateString();

const initialState = savedState || {
    savedWords: ["", "", "", "", ""],
    isCompleted: false,
    completedWordsAmount: 0,
    completeDaysList: [],
    lastEntry: currentDate
};

//reset day statistic
if (currentDate !== initialState.lastEntry) {
    initialState.isCompleted = false;
    initialState.savedWords = ["", "", "", "", ""];
    initialState.lastEntry = currentDate;
}

const statisticSlice = createSlice({
    name: "statistic",
    initialState,
    reducers: {
        addSavedWords(state, action) {
            let isAdded = false;
            let newList = state.savedWords.map(el => {
                if (typeof el !== "number" && !isAdded) {
                    isAdded = true;
                    return action.payload;
                }
                return el;
            });
            state.savedWords = newList;
            statisticStorage("set", state);
        },
        setCompleted(state, action) {
            state.isCompleted = true;
            state.completedWordsAmount = state.completedWordsAmount + 1;
            state.completeDaysList.push(state.lastEntry);
            statisticStorage("set", state);
        }
    }
});

const { addSavedWords, setCompleted } = statisticSlice.actions;

export default statisticSlice.reducer;
export {addSavedWords, setCompleted};