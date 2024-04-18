import Button, { ButtonProps } from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";
import { colors } from "../styles/colors";

const SecondaryButton = styled(Button)(({ theme }) => ({
  background: theme.palette.primary.main,
  border: 0,
  borderRadius: 3,
  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.dark, 0.3)}`,
  color: "white",
  height: 48,
  padding: "0 30px",
  "&:hover": {
    backgroundColor: colors.button.secondary.light,
  },
}));

export default SecondaryButton as React.FC<ButtonProps>;
