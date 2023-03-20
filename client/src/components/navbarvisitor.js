import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import { Link } from 'react';
//import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useEffect, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CssBaseline from '@mui/material/CssBaseline';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
const brightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const pages = ['treatments', 'log in'];
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbarvisitor({ setval }) {
  const navigate = useNavigate();
  const [chosentheme, setChosentheme] = useState(brightTheme);
  const [chosennumber, setChosennumber] = useState();
  useEffect(() => {
    const userTheme = localStorage.getItem('theme')
      ? localStorage.getItem('theme')
      : null;
    if (userTheme && userTheme == 'darkTheme') {
      setChosentheme(darkTheme);
    } else {
      setChosennumber(0);
    }
  }, []);

  useEffect(() => {
    if (chosennumber == 0) {
      localStorage.setItem('theme', 'brightTheme');
      setChosentheme(brightTheme);
    } else {
      localStorage.setItem('theme', 'darkTheme');
      setChosentheme(darkTheme);
    }
  }, [chosennumber]);
  const handlechange = (event) => {
    console.log(event.target.value);
    setval(event.target.value);
  };

  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Dr Semi
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if (page == 'log in') {
                return (
                  <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    onClick={() => navigate('/login')}
                  >
                    {page}
                  </Button>
                );
              }
              return (
                <Button
                  key={page}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                  onClick={() => navigate('/treatments')}
                >
                  {page}
                </Button>
              );
            })}

            <Box
              sx={{
                display: 'flex',
                width: '5%',
                justifyContent: 'center',
                bgcolor: '#1976d2',
                color: 'text.primary',
                borderRadius: 1,
                p: 1,
              }}
            >
              <IconButton
                sx={{ ml: 1 }}
                onClick={() => {
                  chosentheme === darkTheme
                    ? setChosennumber(0)
                    : setChosennumber(1);
                }}
                color="inherit"
              >
                {chosentheme === darkTheme ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </Box>
            <ThemeProvider theme={chosentheme}>
              <CssBaseline />
            </ThemeProvider>
          </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handlechange}
            />
          </Search>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="your account">
              <IconButton sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
