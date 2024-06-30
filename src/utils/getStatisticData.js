function getStatisticData(list, currentDate) {
    const currentMonth = currentDate.getMonth();
    let firstDayWeek = new Date(currentDate.getFullYear(), currentMonth, 1).getDay();
    const lastMonthDate = new Date(currentDate.getFullYear(), currentMonth + 1, 0).getDate();

    let result = [];
    let displayData = [];

    //generate date list
    for (let i = 1; i <= lastMonthDate; i++) {
        result.push(i);
    }

    //generate start shift
    firstDayWeek = firstDayWeek ? firstDayWeek - 1 : 6;

    for (let i = 0; i < firstDayWeek; i++) {
        result.unshift("");
    }

    //generate display data
    result = result.map(el => {

        let data = { value: el };

        if (typeof el === "string") return { value: el, type: "normal" };

        let date = new Date(currentDate.getFullYear(), currentMonth, el);
        let todayDate = new Date();

        if (list.includes(date.toLocaleDateString())) return { ...data, type: "success" };

        //check at today day
        if (date.toLocaleDateString() === todayDate.toLocaleDateString()) return { ...data, type: "normal" }

        if (date.getTime() > todayDate.getTime()) return { ...data, type: "normal" };

        return { ...data, type: "failure" };

    });

    //create statistic dats for mui
    let chunkDisplayData = [];
    let chunkDisplayDataIndex = 0;
    for (let i = 0; i < result.length; i++) {
        
        chunkDisplayData.push(result[i]);
        chunkDisplayDataIndex++;

        if (i + 1 === result.length) {
            displayData.push([ ...chunkDisplayData ]);
            break;
        }

        if (chunkDisplayData.length === 7) {
            displayData.push([ ...chunkDisplayData ]);
            chunkDisplayDataIndex = 0;
            chunkDisplayData = [];
        }

    }

    //last week fill
    let lastListData = displayData[displayData.length - 1];
    for (let i = 0; i < 7; i++) {
        if (!lastListData[i]) lastListData.push({ value: "", type: "normal" });
    }

    displayData[displayData.length - 1] = lastListData;

    return displayData;
}

export { getStatisticData };