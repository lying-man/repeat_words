import { Box, Typography, Button, Alert, Snackbar, useMediaQuery } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import StatisticModal from './StatisticModal/StatisticModal';

const daysStyle = {
    width: "30px",
    height: "30px",
    borderRadius: "3px"
}

const Statistic = () => {

    const {isCompleted, savedWords, completedWordsAmount, completeDaysList} = useSelector(state => state.stat);
    const [snackVisible, setSnackVisible] = useState(false);
    const [detailVisible, setDetailVisible] = useState(false);
    const isFirstLaunch = useRef(true);

    useEffect(() => {
        if (!isFirstLaunch.current) setSnackVisible(true);
    }, [savedWords]);

    useEffect(() => { isFirstLaunch.current = false }, []);

    const match = useMediaQuery('(max-width:450px)');

    return (
        <React.Fragment>
            <Box sx={{ p: "0px 20px" }}>
                <Box sx={{ maxWidth: 500, m: "20px auto", bgcolor: "#fff", color: "#737373", borderRadius: 2, p: "20px" }}>
                    <Typography
                        component={"div"}
                        variant={"h6"}
                        sx={{ textTransform: "uppercase", textAlign: "center", mb: "8px" }}
                    >
                        Статистика
                    </Typography>

                    <Box sx={{ mb: "14px" }}>
                        <Typography
                            component={"div"}
                            variant={"h4"}
                            sx={{ textAlign: "center", mb: "2px", fontWeight: "bold" }}
                        >
                            { completedWordsAmount || "-" }
                        </Typography>
                        <Typography
                            component={"div"}
                            variant={"h6"}
                            sx={{ textAlign: "center" }}
                        >
                            Выполнено Дней
                        </Typography>
                    </Box>

                    <Box 
                        sx={
                            { 
                                display: "flex", 
                                alignItems: "center", 
                                justifyContent: "space-between", 
                                flexDirection: match ? "column" : "row",
                                gap: match ? "12px" : "0px",
                                maxWidth: "400px", 
                                m: "0 auto"
                            }
                        }
                    >
                        <Box sx={{ display: "flex", justifyContent: "center", gap: "3px" }}>
                            {
                                savedWords.map((el, index) => (<Box 
                                        key={index}
                                        sx={{...daysStyle, bgcolor: typeof el === "number" ? "#43a047" : "#B2B2B2"}}
                                    ></Box>))
                            }
                        </Box>
                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small"
                            onClick={() => setDetailVisible(true)}
                        >
                            Статистика по дням
                        </Button>
                    </Box>
                    
                    {
                        isCompleted && (
                            <Alert 
                                icon={<CheckIcon fontSize="inherit" />} 
                                severity="success" 
                                sx={{ display: "flex", justifyContent: "center", mt: "10px" }}
                            >
                                Молодец! Ты выполнил дневной лимит.
                            </Alert>
                        )
                    }

                    <Snackbar 
                        open={snackVisible} 
                        onClose={() => setSnackVisible(false)}
                        autoHideDuration={5000}
                    >
                        <Alert 
                            variant="filled" 
                            onClose={() => setSnackVisible(false)} 
                            severity="success"
                        >
                            Молодец! Ты проработал слово
                        </Alert>
                    </Snackbar>
                </Box>
            </Box>
            
            <StatisticModal setDetailVisible={setDetailVisible} completeDaysList={completeDaysList} detailVisible={detailVisible} />
        </React.Fragment>
    );
}

export default Statistic;
