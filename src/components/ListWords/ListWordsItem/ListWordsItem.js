import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ListWordItemSentences from './ListWordItemSentences/ListWordItemSentences';
import { useDispatch } from 'react-redux';
import { setCurrentCopyData, setVisibilityCopyModal } from '../../../store/Slices/copySlice';
import { Link } from 'react-router-dom';
import { setEditingWord } from '../../../store/Slices/wordsSlice';

const headingStyle = {
    lineHeight: "100%", 
    textTransform: "uppercase", 
    display: "inline-block", 
    background: "#42c1ff",
    p: "4px",
    borderRadius: "3px",
    color: "#fff" 
};

const ListWordsItem = (data) => {

    const dispatch = useDispatch();

    const { word, description, sentences, matchesOne, matchesTwo } = data;

    const copyHandler = () => {
        dispatch(setCurrentCopyData(data));
        dispatch(setVisibilityCopyModal(true));
    }

    const editHandler = () => {
        dispatch(setEditingWord(data));
    }

    return (
        <Box sx={{ background: "#fff", p: "20px", borderRadius: "10px", mb: "22px" }}>
            
            <Typography 
                component="div" 
                variant={ matchesOne ? "h5" : "h4" } 
                sx={{ fontWeight: "bold" }}
            >
                    { word }
            </Typography>

            <Box sx={{ mt: matchesOne ? "16px" : "30px" }}>
                <Typography component="div" sx={headingStyle} variant="subtitle1">Определение</Typography>
                <Typography variant="h6" sx={{ lineHeight: "110%", mt: "12px" }}>{ description || "Определение не добавлено" }</Typography>

                <Box sx={{ mt: "22px" }}>   
                    <Typography component="div" sx={headingStyle} variant="subtitle1">Предложения</Typography>

                    <ListWordItemSentences sentences={sentences} />

                    <Stack sx={{ mt: "25px" }} direction={ matchesTwo ? "column" : "row" } spacing={1}>
                        <Link to="/edit" onClick={editHandler}>
                            <Button variant="contained" size="small" sx={{ minWidth: "100%" }}>Редактировать</Button>
                        </Link>
                        <Button onClick={copyHandler} variant="contained" size="small" endIcon={<ContentCopyIcon />}>Копировать</Button>
                    </Stack>    
                </Box>
            </Box>
        </Box>  
    );
}

export default ListWordsItem;
