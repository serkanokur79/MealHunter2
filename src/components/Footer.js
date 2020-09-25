import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';

import StorageIcon from '@material-ui/icons/Storage';
import CopyrightIcon from '@material-ui/icons/Copyright';
import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: { height: 60, width: '100%' },
  title: { padding: 10, fontSize: 'xxlarge' },
  paper: { padding: '30px 0' },
}));

export default function Footer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={0} md={1}></Grid>
            <Grid item xs={12} md={10} container>
              <Grid item xs={6}>
                <span className='title'>
                  <CopyrightIcon />
                  2020 Designed by
                  <Button
                    href='https://serkanokur-portfolio.netlify.app/'
                    target='_blank'
                  >
                    Serkan Okur
                  </Button>
                </span>
              </Grid>
              <Grid item xs={6}>
                <span>
                  <StorageIcon />
                  Database:
                  <Button href='https://www.themealdb.com' target='_blank'>
                    TheMealDB API
                  </Button>
                </span>
              </Grid>
            </Grid>
            <Grid item xs={0} md={1}></Grid>
          </Grid>
        </Paper>
      </AppBar>
    </div>
  );
}
