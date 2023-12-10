import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Zoom from '@mui/material/Zoom';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { manageModeWordsStorage } from '../../utils/manageModeWordsStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getRandomWords } from '../../api/points';

const options = ["Отобразить 1 слово", "Отобразить 3 слова"];

export default function ModeButton() {

    const dispatch = useDispatch();
    const isLoadingWords = useSelector(state => state.word.isLoadingWords);

    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(() => {
        let savedValue = manageModeWordsStorage("get");
        if (!savedValue) return 0;
        return savedValue === "single" ? 0 : 1; 
    });

    useEffect(() => {
        function keydownHandler(e) {

            if (e.altKey && e.code === "KeyC") {
                setSelectedIndex(0);
                manageModeWordsStorage("save", "single");
                return;
            }

            if (e.altKey && e.code === "KeyV") {
                setSelectedIndex(1);
                manageModeWordsStorage("save", "many");
                return;
            }

        }

        document.documentElement.addEventListener("keydown", keydownHandler);
        return () => document.documentElement.removeEventListener("keydown", keydownHandler);
    }, []);

    const handleClick = () => {
        let currentMode = selectedIndex === 0 ? "single" : "many";
        dispatch(getRandomWords({ mode: currentMode }));
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
        manageModeWordsStorage("save", index === 0 ? "single" : "many");
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup color="secondary" size="small" variant="contained" ref={anchorRef} aria-label="split button">
                <Button disabled={isLoadingWords} size="small" onClick={handleClick}>{options[selectedIndex]}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Zoom
                        {...TransitionProps}
                        style={{
                        transformOrigin:
                            placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                        sx={{ mt: "10px" }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Zoom>
                )}
            </Popper>
        </React.Fragment>
    );
}
