import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#4B0082',
        },
        secondary: {
            main: '#daae51',
        },
        error: {
            main: red.A400,
        },
    },
});

export default theme;