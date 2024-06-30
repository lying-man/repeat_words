import React, { memo, useState } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, IconButton, useMediaQuery } from '@mui/material';
import StatisticDetail from './StatisticDetail/StatisticDetail';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { dataMonth } from '../../../data/dataMonthDisplay';

const StatisticModal = memo(({ setDetailVisible, detailVisible, completeDaysList }) => {

    const [currentDate, setCurrentDate] = useState(() => new Date());
    const dateText = currentDate.toLocaleDateString().split(".").filter((el, i) => i > 0 ? i : "").join(".");

    const manageDate = (type) => {
        if (type === "inc") {
            let nextMonth = currentDate.getMonth() + 1 <= 11 ? currentDate.getMonth() + 1 : 0;
            let nextYear = nextMonth ? currentDate.getFullYear() : currentDate.getFullYear() + 1;
            setCurrentDate(new Date(nextYear, nextMonth));
        } else {
            let prevMonth = currentDate.getMonth() - 1 >= 0 ? currentDate.getMonth() - 1 : 11;
            let prevYear = prevMonth !== 11 ? currentDate.getFullYear() : currentDate.getFullYear() - 1;
            setCurrentDate(new Date(prevYear, prevMonth));
        }
    }

    return (
        <Dialog 
            onClose={() => setDetailVisible(false)} 
            open={detailVisible} 
            sx={{ p: "20px", maxWidth: "900px", margin: "0 auto" }}
            fullWidth={true}
            maxWidth={"md"}
        >
            <DialogTitle sx={{ textAlign: "center" }}>Календарь Выполнений</DialogTitle>
            <Box sx={{ textAlign: "center", mb: "10px" }}>
                <Typography component={"div"} variant={"h6"} sx={{ fontWeight: "bold", color: "#039be5" }}>
                    { `${dateText} - ${dataMonth[String(currentDate.getMonth())]}` }
                </Typography>
            </Box>
            <Box sx={{ p: "0px 20px 10px 20px" }}>
                <StatisticDetail currentDate={currentDate} list={completeDaysList} />
            </Box>

            <Box 
                sx={{ p: "0px 20px 10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
            >
                <Box>
                    <IconButton color="primary" onClick={() => manageDate("dec")}><KeyboardArrowLeftIcon /></IconButton>
                    <IconButton color="primary" onClick={() => manageDate("inc")}><KeyboardArrowRightIcon /></IconButton>
                </Box>
                <Button variant="contained" size="small" onClick={() => setDetailVisible(false)}>Закрыть</Button>
            </Box>
        </Dialog>
    );
});

export default StatisticModal;
