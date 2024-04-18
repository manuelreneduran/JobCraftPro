import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Panel = styled(Box)(({ theme }) => ({
  flex: 1,
  boxSizing: "border-box",
}));

export default Panel as React.FC<BoxProps>;
