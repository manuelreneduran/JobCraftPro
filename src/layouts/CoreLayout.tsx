import { Box } from "@mui/material";
import Header from "../components/Header";
import useAppBarHeight from "../hooks/useAppBarHeight";

type CoreLayoutProps = {
  children: React.ReactNode;
  useHeader?: boolean;
};

const CoreLayout = ({ children, useHeader = true }: CoreLayoutProps) => {
  const appBarHeight = useAppBarHeight();
  return (
    <Box className="core-layout">
      {useHeader && <Header />}
      <Box
        className="core-layout-children-wrapper"
        height={useHeader ? `calc(100vh - ${appBarHeight}px)` : "100vh"}
      >
        {children}
      </Box>
    </Box>
  );
};
export default CoreLayout;
