import React from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import notFound from '../images/notFound.png';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    padding: 20,
    justifyItems: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    marginTop: 10,
  },
  logo: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextBox: {
    flexGrow: 1,
  },
}));

function NotFound() {
  const classes = useStyles();
  const history = useHistory();
  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };
  const handleGoHome = (e) => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <Paper style={{}} className={classes.root}>
      <Grid container>
        <Grid item xs={6} className={classes.logo}>
          <img src={notFound} />
        </Grid>
        <Grid item xs={6} className={classes.TextBox}>
          <Typography variant='h1'>Something went wrong!</Typography>
          <Typography variant='h5'>
            The page you are looking for does not exist.
          </Typography>
          <Typography variant='h5'>
            <Button type='text' onClick={handleGoBack}>
              Go Back
            </Button>
            or head over to
            <Button type='text' onClick={handleGoHome}>
              Meal Hunter Home Page
            </Button>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default NotFound;
