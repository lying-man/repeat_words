import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ModeButton from '../ModeButton/ModeButton';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {

  const matchesOne = useMediaQuery('(max-width:780px)');
  const matchesTwo = useMediaQuery('(max-width:450px)');

  return (
    <Box sx={{ flexGrow: 1, p: "20px 20px 0px 20px" }}>
      <AppBar 
        position="static" 
        sx={{ boxShadow: "none", borderRadius: "10px" }}
      >
        <Toolbar sx={{ flexDirection: matchesOne ? "column" : "row", p: matchesOne ? "20px 0px" : "0px" }}>

          <Typography 
            variant={ matchesTwo ? "body2" : "body1" } 
            component="div" 
            sx={{ flexGrow: 1, textTransform: "uppercase", mb: matchesOne ? "12px" : "0px" }}
          >
            Обновление словарного запаса
          </Typography>

          <Box sx={{ display: "flex", gap: "12px", alignItems: "center", flexDirection: matchesTwo ? "column" : "row" }}>
            <ModeButton />
            <Link to="/add">
              <Button variant="contained" color="secondary" size="small">Добавить слово</Button>
            </Link>
          </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

