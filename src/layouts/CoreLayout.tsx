import { Box } from "@mui/material";
import Header from "../components/Header";
import useAppBarHeight from "../hooks/useAppBarHeight";

type CoreLayoutProps = {
    children: React.ReactNode;
}

const CoreLayout = ({ children }: CoreLayoutProps) => {
    const appBarHeight = useAppBarHeight()
    return (
        <Box className="core-layout">
            <Header />
            <Box className="core-layout-children-wrapper" height={`calc(100vh - ${appBarHeight}px)`}>
                {children}
            </Box>
        </Box>
    );
}
export default CoreLayout;