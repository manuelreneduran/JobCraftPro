import MuiTypography, { TypographyProps } from "@mui/material/Typography";

const Typography = ({ color = "textPrimary", ...props }: TypographyProps) => {
  return <MuiTypography {...props} color={color} />;
};
export default Typography;
