import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import ListWordsItem from './ListWordsItem/ListWordsItem';
import { useDispatch, useSelector } from "react-redux";
import { getRandomWords } from '../../api/points';
import { manageModeWordsStorage } from '../../utils/manageModeWordsStorage';
import useMediaQuery from '@mui/material/useMediaQuery';

const ListWords = () => {

    const dispatch = useDispatch();
    const { words, isLoadingWords } = useSelector(state => state.word);

    const matchesOne = useMediaQuery("(max-width:500px)");
    const matchesTwo = useMediaQuery("(max-width:400px)");

    useEffect(() => {
        let isPressed = false;

        const setIsPressed = (status) => isPressed = status;

        function keydownHandler(e) {
            if (e.altKey && e.code === "KeyB") {
                if (!isPressed) {
                    setIsPressed(true);
                    let savedValue = manageModeWordsStorage("get");
                    dispatch(getRandomWords({ mode: savedValue || "single", setIsPressed }));
                }
            }
        }

        document.documentElement.addEventListener("keydown", keydownHandler);
        return () => document.documentElement.removeEventListener("keydown", keydownHandler);
    }, []);

    useEffect(() => {
        if (!words.length) { 
            let savedValueMode = manageModeWordsStorage("get");
            dispatch(getRandomWords({ mode: savedValueMode || "single" }));
        }
    }, []);

    if (isLoadingWords) return <Box sx={{ p: "60px 20px", textAlign: "center" }}><CircularProgress size={30} /></Box>

    return (
        <Box sx={{ p: "20px", maxWidth: "940px", m: "30px auto 0px auto" }}>
            {
                words.map(el => <ListWordsItem key={el.id} { ...el } matchesOne={matchesOne} matchesTwo={matchesTwo} />)
            }
        </Box>
    );
}

export default ListWords;
