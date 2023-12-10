import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AddSentenceItem = ({ text, id, editCallback, removeCallback, editingSentenceId, isLoading }) => {

    const editHandler = () => {
        editingSentenceId.current = id;
        editCallback(text)
    }

    return (
        <Box sx={{ borderRadius: "4px", background: "#fff", p: "10px", mb: "15px" }}>
            <Typography component="div" sx={{ wordWrap: "break-word" }}>{text}</Typography>
            <Box sx={{ textAlign: "right", mt: "10px" }}>
                <Button 
                    disabled={ editingSentenceId.current === id || isLoading }
                    size="small" 
                    variant="contained" 
                    sx={{ mr: "8px" }} 
                    color="warning"
                    onClick={ editHandler }
                >
                    Редактировать
                </Button>
                <Button 
                    disabled={ editingSentenceId.current === id || isLoading }
                    size="small" 
                    color="error" 
                    variant="contained"
                    onClick={() => removeCallback(id)}
                >
                    Удалить
                </Button>
            </Box>
        </Box>
    );
}

export default AddSentenceItem;
