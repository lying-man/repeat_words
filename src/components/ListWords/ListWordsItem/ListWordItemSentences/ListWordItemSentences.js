import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const ListWordItemSentences = ({ sentences }) => {

    if (!sentences.length) return <Box><Typography variant="subtitle1">Предложения не добавлены</Typography></Box>

    return (
        <List disablePadding={true} sx={{ mt: "12px" }}>
            {
                sentences.map((el, index) => (
                    <ListItem key={index} sx={{ p: "0px", mb: index !== sentences.length - 1 ? "12px" : "0px" }}>
                        <Typography variant="subtitle1" sx={{ lineHeight: "110%" }}>{ el.sentence }</Typography>
                    </ListItem>
                ))
            }
        </List>
    );
}

export default ListWordItemSentences;
