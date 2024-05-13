import ArticleIcon from "@mui/icons-material/Article";
import BuildIcon from "@mui/icons-material/Build";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { colors } from "../styles/colors";
import { EMenuItemSettings, EPages, EPaths } from "../utils/types";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, Stack } from "@mui/material";
import Loader from "./Loader";
import ErrorPage from "../pages/ErrorPage";
import useAppBarHeight from "../hooks/useAppBarHeight";
const drawerWidth = 200;

const documents: { name: EPages; route: EPaths; icon: React.ReactNode }[] = [
  {
    name: EPages.COVER_LETTER,
    route: EPaths.COVER_LETTER,
    icon: <ArticleIcon />,
  },
];

const pages: { name: EPages; route: EPaths; icon: React.ReactNode }[] = [
  {
    name: EPages.DASHBOARD,
    route: EPaths.DASHBOARD,
    icon: <HomeIcon />,
  },
];

const generators: { name: EPages; route: EPaths; icon: React.ReactNode }[] = [
  {
    name: EPages.GENERATE_COVER_LETTER,
    route: EPaths.GENERATE_COVER_LETTER,
    icon: <BuildIcon />,
  },
];

const settings: {
  name: EMenuItemSettings;
  icon: React.ReactNode;
  route: string;
}[] = [
  {
    name: EMenuItemSettings.LOGOUT,
    icon: <LogoutIcon />,
    route: EPaths.LOGOUT,
  },
];

type NavMenuProps = {
  children: React.ReactNode;
  pageHeader?: string;
  isLoading?: boolean;
  isError?: boolean;
};
export default function NavMenu({
  children,
  pageHeader,
  isLoading = false,
  isError = false,
}: NavMenuProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [openNestedDocuments, setOpenNestedDocuments] = React.useState(true);
  const [openNestedGenerate, setOpenNestedGenerate] = React.useState(true);

  const navigate = useNavigate();
  const height = useAppBarHeight();

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleNestedDocumentsItemClick = () => {
    setOpenNestedDocuments(!openNestedDocuments);
  };

  const handleNestedGenerateItemClick = () => {
    setOpenNestedGenerate(!openNestedGenerate);
  };
  const drawer = (
    <div>
      <Toolbar disableGutters>
        <Box paddingLeft="8px" sx={{ display: { xs: "none", sm: "flex" } }}>
          <img
            style={{
              maxHeight: "36px",
            }}
            src={logo}
            alt="JobCraftPro Logo"
          />
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {pages.map(({ name, route, icon }) => (
          <ListItem
            key={name}
            disablePadding
            onClick={() => {
              navigate(route);
            }}
          >
            <ListItemButton>
              <ListItemIcon
                sx={{ color: colors.button.primary.main, minWidth: "32px" }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItemButton onClick={handleNestedGenerateItemClick}>
          <ListItemIcon
            sx={{ color: colors.button.primary.main, minWidth: "32px" }}
          >
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary={"Generate"} />
          {openNestedGenerate ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNestedGenerate} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {generators.map(({ name, route }) => (
              <ListItemButton key={name} onClick={() => navigate(route)}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body2",
                  }}
                  primary={name}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
        <ListItemButton onClick={handleNestedDocumentsItemClick}>
          <ListItemIcon
            sx={{ color: colors.button.primary.main, minWidth: "32px" }}
          >
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary={"Documents"} />
          {openNestedDocuments ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openNestedDocuments} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {documents.map(({ name, route }) => (
              <ListItemButton key={name} onClick={() => navigate(route)}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "body2",
                  }}
                  primary={name}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {settings.map(({ name, route }) => (
          <ListItem
            key={name}
            disablePadding
            onClick={() => {
              navigate(route);
            }}
          >
            <ListItemButton>
              <ListItemText primary={name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageHeader}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: `calc(100vh - ${height}px - 48px)`,
        }}
      >
        <Toolbar />
        {isLoading ? (
          <Stack justifyContent="center" alignItems="center">
            <Loader />
          </Stack>
        ) : isError ? (
          <ErrorPage />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}
