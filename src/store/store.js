import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderReducer from "./Slices/loaderSlice";
import copyReducer from "./Slices/copySlice";
import wordReducer from "./Slices/wordsSlice";
import statisticReducer from "./Slices/statisticSlice"

const rootReducer = combineReducers({
    loader: loaderReducer,
    copy: copyReducer,
    word: wordReducer,
    stat: statisticReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;