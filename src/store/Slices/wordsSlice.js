import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isHintWordShowed: false,
    isFirstLoading: false,
    isLoadingWords: false,
    words: [],
    editingWord: {}
}

const wordsSlice = createSlice({
    name: "words", 
    initialState,
    reducers: {
        setIsHintWordShowed(state, action) { state.isHintWordShowed = action.payload },
        setIsLoadingWords(state, action) { state.isLoadingWords = action.payload },
        setWords(state, action) { 
            state.words = action.payload;
            if (!state.isFirstLoading) state.isFirstLoading = true;
        },
        setEditingWord(state, action) { state.editingWord = action.payload; },
        editDescription(state, action) {
            state.words = state.words.map(el => {
                if (el.id === action.payload.id) return { ...el, description: action.payload.content };
                return el;
            });
        },
        editSentences(state, action) {
            state.words = state.words.map(el => {
                if (action.payload.wordID === el.id) {

                    let newSentences = null;

                    if (action.payload.mode === "editing") {
                        newSentences = el.sentences.map(el => {
                            if (el.id === action.payload.sentenceId) return { ...el, sentence: action.payload.content };
                            return el;
                        });
                    }

                    if (action.payload.mode === "delete") {
                        newSentences = el.sentences.filter(el => el.id !== action.payload.sentenceId);
                    }

                    if (action.payload.mode === "add") {
                        newSentences = [ ...el.sentences, { word_id: action.payload.wordID, sentence: action.payload.content, id: action.payload.id } ];
                    }

                    let editedWord = { ...el, sentences: newSentences };
                    state.editingWord = editedWord;
                    return editedWord;
                }
                return el;
            });
        }
    }
});

const { reducer, actions } = wordsSlice;
const { setWords, setEditingWord, editDescription, editSentences, setIsLoadingWords, setIsHintWordShowed } = actions;

export default reducer;
export { setWords, setEditingWord, editDescription, editSentences, setIsLoadingWords, setIsHintWordShowed };