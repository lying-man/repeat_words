import React from 'react';
import { createTheme, ThemeProvider} from '@mui/material/styles';

const ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#039be5',
      },
      secondary: {
        main: '#43a047',
      },
    },
};

const theme = createTheme(ThemeOptions);

const Theme = (props) => {
    return (
        <ThemeProvider theme={theme}>
            { props.children }
        </ThemeProvider>
    );
}

export default Theme;