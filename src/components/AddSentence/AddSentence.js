import React, { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AddSentenceItem from './AddSentenceItem/AddSentenceItem';
import { validateInput } from "../../utils/validateInput";
import Stack from "@mui/material/Stack";

const AddSentence = React.memo(function AddSentence({ list, configList, isLoading }) {

    const [isError, setIsError] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const editingSentenceId = useRef(null);

    const { addCallback, editCallback, removeCallback } = configList;

    const addSentenceHandler = () => {
        let validateResult = validateInput(inputValue);

        if (validateResult) {
            addCallback(inputValue);
            setInputValue("");
            return;
        }

        setIsError(true);
    }

    const editSentenceHandler = () => {
        let validateResult = validateInput(inputValue);

        if (validateResult) {
            editCallback(editingSentenceId.current, inputValue);
            resetSentenceEdit();
            return;
        }

        setIsError(true);
    }

    const resetSentenceEdit = () => {
        setIsEdit(false);
        setInputValue("");
        editingSentenceId.current = null;
    }

    const addSentenceEdit = (content) => {
        setInputValue(content);
        setIsEdit(true);
    }

    return (
        <Box sx={{ mt: "18px" }}>
            <Typography variant="body2" sx={{ mb: "10px", textTransform: "uppercase" }}>Предложения</Typography>

            <TextField
                error={isError}
                id="filled-error-helper-text"
                label={"Предложение"}
                helperText={isError && "Поле должно содержать минимум 3 символа"}
                multiline={true}
                fullWidth={true}
                disabled={isLoading}
                sx={{ "& > div": { background: "#fff" }}}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsError(false)}
            />

            <Stack direction="row" spacing={1} sx={{ mt: "8px" }} >
                <Button
                    variant="text"  
                    disabled={isLoading}
                    onClick={ isEdit ? editSentenceHandler : addSentenceHandler }
                >
                    { isEdit ? "Изменить" : "Добавить предложение" }
                </Button>
                { isEdit && <Button disabled={isLoading} size="small" variant="text" onClick={resetSentenceEdit}>Отмена</Button> }
            </Stack>

            <Box sx={{ mt: "12px" }}>
                {
                    !list || !list.length ? <Typography variant="body1">Нет добавленных предложений</Typography> : (
                        list.map(el => (
                            <AddSentenceItem 
                                key={el.id} 
                                id={el.id} 
                                editCallback={addSentenceEdit}
                                text={el.sentence}
                                removeCallback={removeCallback}
                                editingSentenceId={editingSentenceId}
                                isLoading={isLoading}
                            />)
                        )
                    )
                }
            </Box>
        </Box>
    );
});

export default AddSentence;
