import React from 'react';
import ListWords from "../ListWords/ListWords";
import Header from "../Header/Header";
import CopyModal from '../CopyModal/CopyModal';
import Hint from '../Hint/Hint';
import Statistic from '../Statistic/Statistic';

const Main = () => {
    return (
        <React.Fragment>
            <Header />
            <Statistic />
            <ListWords />
            <CopyModal />
            <Hint />
        </React.Fragment>  
    );
}

export default Main;
