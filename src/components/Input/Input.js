import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const Input = ({ title, label, multi, error, errorMessage, initialValue, onChange, required, value, onFocus, isDisabled }) => {
    return (
        <Box sx={{ mt: "18px" }}>
            <Typography sx={{ mb: "12px", textTransform: "uppercase" }} variant="body2">{title}</Typography>
            <TextField      
                required={required}
                error={error}
                id="filled-error-helper-text"
                label={label}
                helperText={errorMessage}
                multiline={multi}
                fullWidth={true}
                sx={{ "& > div": { background: "#fff" } }}
                autoComplete='off'
                defaultValue={initialValue}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                disabled={isDisabled}
            />
        </Box>
    );
}

export default Input;
