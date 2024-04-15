import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { EMenuItemSettings, EPages } from '../utils/types';
import logo from '../assets/logo.svg';


const pages: EPages[] = [EPages.DASHBOARD, EPages.COVER_LETTER];
const settings: EMenuItemSettings[] = [EMenuItemSettings.LOGOUT];


const Header = () => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const { user, logout } = useAuth();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (setting: EMenuItemSettings) => {
        setAnchorElUser(null);
    };

    const handleMenuItemSettingsClick = (setting: EMenuItemSettings) => {
        switch (setting) {
            case 'Logout':
                logout();
                break;
            default:
                break;
        }
        handleCloseNavMenu();
    }

    const handleNavPageClick = (page: string) => {
        handleCloseNavMenu();

    }


    return (
        <>
            <AppBar color="transparent" position="static" sx={{ boxShadow: '0 5px 20px 0 rgba(11,7,110,.04)' }}>
                <Container maxWidth="xl" disableGutters sx={{ paddingRight: '16px', paddingLeft: '4px' }}>
                    <Toolbar disableGutters >
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

                            <img style={{
                                maxHeight: '54px',
                            }} src={logo} alt="JobCraftPro Logo" />


                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={() => handleNavPageClick(page)}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '0.5rem',
                            textAlign: 'center',
                            position: 'absolute',
                            left: '50%',
                            transform: 'translateX(-50%)',
                        }}>

                            <img style={{
                                maxHeight: '36px',
                            }} src={logo} alt="JobCraftPro Logo" />

                        </Box>
                        <Box sx={{ flexGrow: 1, paddingRight: '2rem', justifyContent: 'flex-end', display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 1, display: 'block', "&.MuiButtonBase-root:hover": {
                                            bgcolor: "transparent"
                                        }
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar sx={{
                                        height: '32px',
                                        width: '32px'
                                    }} src={user?.picture} />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleMenuItemSettingsClick(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default Header;