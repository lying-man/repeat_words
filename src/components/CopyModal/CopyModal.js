import React, { useState } from 'react';
import { Dialog, DialogTitle, Box, Button, Typography } from '@mui/material';
import { namesOfPosition } from "../../data/dataCopyPositions";
import { useDispatch, useSelector } from 'react-redux';
import { setVisibilityCopyModal } from "../../store/Slices/copySlice";

const CopyModal = () => {

    const { visible, currentCopyData } = useSelector(state => state.copy);
    const [isCopied, setIsCopied] = useState(false);

    const dispatch = useDispatch();

    const handleCloseCopyDialog = () => {
        dispatch(setVisibilityCopyModal(false));
    }

    const feedbackContentStyles = {
        position: "absolute", 
        background: "#fff", 
        left: 0, 
        top: 0, 
        width: "100%", 
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: isCopied ? "auto" : "none",
        opacity: isCopied ? 1 : 0,
        transform: isCopied ? "scale(1)" : "scale(0.8)",
        transition: "all 0.3s ease-out"
    };

    const copyHandler = (copySubject, index) => {
        if (copySubject === "sentences") navigator.clipboard.writeText(currentCopyData.sentences[index].sentence);
        if (copySubject === "word") navigator.clipboard.writeText(currentCopyData.word);
        if (copySubject === "description") navigator.clipboard.writeText(currentCopyData.description);

        setIsCopied(true);
        setTimeout(() => {
            dispatch(setVisibilityCopyModal(false));
            setIsCopied(false);
        }, 800);
    }

    if (!currentCopyData) return null;

    const displaySentencesCopy = () => {
        return currentCopyData.sentences.map((el, index) => (
            (
                <Box key={index}>
                    <Button 
                        onClick={() => copyHandler("sentences", index)} 
                        sx={{ p: "10px" }} 
                        fullWidth={true}
                    >
                        { `Копировать ${namesOfPosition[index] || "N"} предложение` }
                    </Button>
                </Box>
            )
        ));
    }

    return (
        <Dialog onClose={handleCloseCopyDialog} open={visible}>
            <DialogTitle>Выберите что хотите копировать</DialogTitle>
            <Box sx={{ pb: "8px" }}>
                <Box><Button onClick={() => copyHandler("word")} sx={{ p: "10px" }} fullWidth={true}>Копировать слово</Button></Box>
                { currentCopyData.description && <Box><Button onClick={() => copyHandler("description")} sx={{ p: "10px" }} fullWidth={true}>Копировать определение</Button></Box> }
                { currentCopyData.sentences && displaySentencesCopy() }
            </Box>
            <Box sx={feedbackContentStyles}>
                <Typography sx={{textTransform: "uppercase"}} variant="h6">Скопировано</Typography>
            </Box>
        </Dialog>
    );
}

export default CopyModal;