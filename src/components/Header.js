import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {},
  gridContainer: {},
  menuButton: {
    marginRight: 20,
  },

  title: { padding: 10 },
  noFocus: {
    '&:hover': {
      outline: 'none',
    },
  },
}));

const Categories = [
  { title: 'Beef' },
  { title: 'Breakfast' },
  { title: 'Chicken' },
  { title: 'Dessert' },
  { title: 'Goat' },
  { title: 'Lamb' },
  { title: 'Pasta' },
  { title: 'Pork' },
  { title: 'SeaFood' },
  { title: 'Side' },
  { title: 'Starter' },
  { title: 'Vegan' },
  { title: 'Vegetarian' },
  { title: 'Miscellaneous' },
];

export default function Header(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [darkMode, setDarkMode] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(null);

  const open = Boolean(anchorEl);
  const history = useHistory();
  const handleChange = (event) => {
    setAuth(true);
  };
  const handleDarkModeChange = () => {
    setDarkMode(!darkMode);
    props.handleThemeChange();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMainMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignIn = (event) => {
    setAuth(true);
  };
  const handleSignOut = (event) => {
    setAuth(false);
  };
  const handlePushHome = () => {
    history.push('/');
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategorySelect = (event, value, reason) => {
    switch (reason) {
      case 'select-option':
        history.push(`/cat/${value}`);
        setSearchValue(null);
        break;
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Paper>
          <Grid container>
            <Grid item xs={0} md={1}></Grid>
            <Grid item xs={12} md={10}>
              <Toolbar>
                <Button
                  edge='start'
                  className={classes.Logo}
                  color='inherit'
                  aria-label='menu'
                  onClick={handlePushHome}
                >
                  <FastfoodIcon />
                  <Typography variant='h6' className={classes.title}>
                    Meal Hunter
                  </Typography>
                </Button>

                <div
                  style={{
                    flexGrow: 1,

                    padding: '0 10px',
                  }}
                >
                  <Autocomplete
                    id='search-categories'
                    freeSolo
                    clearOnEscape='true'
                    options={Categories.map((option) => option.title)}
                    value={searchValue}
                    onSelect={(event, value) => setSearchValue(value)}
                    onChange={(event, value, reason) =>
                      handleCategorySelect(event, value, reason)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Search a category'
                        margin='normal'
                        padding='normal'
                        value={searchValue}
                        style={{ paddingBottom: 20 }}
                      />
                    )}
                  />
                </div>

                {darkMode && (
                  <Tooltip
                    title='Turn off Dark Mode'
                    aria-label='Turn off Dark Mode'
                    interactive
                  >
                    <IconButton
                      color='inherit'
                      className={classes.noFocus}
                      onClick={handleDarkModeChange}
                    >
                      <Brightness5Icon />
                    </IconButton>
                  </Tooltip>
                )}

                {!darkMode && (
                  <Tooltip
                    title='Turn on Dark Mode'
                    aria-label='Turn on Dark Mode'
                    interactive
                  >
                    <IconButton
                      color='inherit'
                      className={classes.noFocus}
                      onClick={handleDarkModeChange}
                    >
                      <Brightness4Icon />
                    </IconButton>
                  </Tooltip>
                )}

                <div>
                  <IconButton
                    aria-label='account of current user'
                    aria-controls='menu-appbar'
                    aria-haspopup='true'
                    onClick={handleMenu}
                    color='inherit'
                    className={classes.noFocus}
                  >
                    <AccountCircleIcon />
                  </IconButton>
                  <Menu
                    id='menu-appbar'
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {auth && (
                      <>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>
                          Favorite Categories
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Bookmarks</MenuItem>
                        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                      </>
                    )}
                    {!auth && (
                      <>
                        <MenuItem onClick={handleSignIn}>Sign In</MenuItem>
                      </>
                    )}
                  </Menu>
                </div>
              </Toolbar>
            </Grid>
            <Grid item xs={0} md={1}></Grid>
          </Grid>
        </Paper>
      </AppBar>
    </div>
  );
}
