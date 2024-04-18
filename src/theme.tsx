import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5A00",
    },
    secondary: {
      main: "#00a5ff",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#36454F",
    },
  },
});

export default theme;
