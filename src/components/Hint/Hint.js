import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Checkbox from '@mui/material/Checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { setIsHintWordShowed } from '../../store/Slices/wordsSlice';
import useMediaQuery from '@mui/material/useMediaQuery';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Hint = () => {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState(false);

    const dispatch = useDispatch();
    const matchesOne = useMediaQuery("(max-width:400px)");

    const isFirstLoading = useSelector(state => state.word.isFirstLoading);
    const isHintWordShowed = useSelector(state => state.word.isHintWordShowed);

    useEffect(() => {

        const displayHintSaved = localStorage.getItem("hintWords");

        if (!displayHintSaved) {

            if (isFirstLoading && !isHintWordShowed) {
                if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))) {
                    setTimeout(() => setOpen(true), 200);
                }
                dispatch(setIsHintWordShowed(true));
            }

        }

    }, [isFirstLoading]);
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (event) => {
        const isChecked = event.target.checked;

        if (isChecked) {
            localStorage.setItem("hintWords", "ok");
        } else { localStorage.removeItem("hintWords"); }

        setChecked(isChecked);
    };

    return (
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle>Подсказка</DialogTitle>
                <DialogContent>
                    <Box>
                        <Typography 
                            sx={{ mb: "10px" }}
                            variant={ matchesOne ? "body2" : "body1" }
                        >
                            Вы можете управлять приложением с помощью горячих клавиш:
                        </Typography>
                        <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "bold" }}>ALT + B</Typography>
                            <Typography variant={ matchesOne ? "body2" : "body1" }>- показ новых слов</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "bold" }}>ALT + C</Typography>
                            <Typography variant={ matchesOne ? "body2" : "body1" }>- режим одного слова</Typography>
                        </Box>
                        <Box sx={{ display: "flex", gap: "3px", alignItems: "center" }}>
                            <Typography sx={{ fontWeight: "bold" }}>ALT + V</Typography>
                            <Typography variant={ matchesOne ? "body2" : "body1" }>- режим 3-х слов</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ mt: "8px" }}>
                        <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
                            <Checkbox checked={checked} onChange={handleChange} />
                            <Typography variant={ matchesOne ? "body2" : "body1" }>Не показывать больше</Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Понял
                </Button>
                </DialogActions>
            </Dialog>
        );
}

export default Hint;
