function statisticStorage(type, data) {

    if (type === "get") {
        let savedStat = localStorage.getItem("STAT_DATA");
        return savedStat ? JSON.parse(savedStat) : null;
    } else {
        localStorage.setItem("STAT_DATA", JSON.stringify(data));
    }

}

export { statisticStorage };