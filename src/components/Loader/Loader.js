import React, { useLayoutEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { setScroll } from '../../utils/setScroll';
import { useSelector } from 'react-redux';

const Loader = () => {

    const visibility = useSelector(state => state.loader.visibility);

    useLayoutEffect(() => {
        setScroll( visibility ? "hide" : "show" )
    }, [ visibility ]);

    return (
        <Backdrop
            sx={{ background: "rgba(0, 0, 0, 0.7)",  color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={visibility}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default Loader;
