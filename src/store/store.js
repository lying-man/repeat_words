import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loaderReducer from "../store/Slices/loaderSlice";
import copyReducer from "../store/Slices/copySlice";
import wordReducer from "../store/Slices/wordsSlice";

const rootReducer = combineReducers({
    loader: loaderReducer,
    copy: copyReducer,
    word: wordReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;