
const manageModeWordsStorage = (mode, data) => {
    if (mode === "get") {
        return localStorage.getItem("modeWords");
    } else {
        localStorage.setItem("modeWords", data);
    }
}

export { manageModeWordsStorage }