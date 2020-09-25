import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import CategoryCard from './CategoryCard';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    margin: '30px auto 60px auto',
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
  },
  control: {
    padding: 10,
  },
}));

const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

function Main() {
  const [catData, setCatData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(apiUrl);
      const data = await res.json();

      if (data) {
        let rawData = Object.values(data.categories);
        let catData = [];
        rawData.map((dat, i) => catData.push(Object.values(rawData[i])));

        setCatData(catData);
      }
      setLoaded(true);
    };
    fetchData();
  }, []);

  return (
    <Paper className={classes.root}>
      <Typography variant='h3' color='textPrimary'>
        Meal categories:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify='center' spacing={2}>
            {loaded &&
              catData.map((data) => {
                return (
                  <Grid key={data[0]} item>
                    <CategoryCard
                      idCategory={data[0]}
                      strCategory={data[1]}
                      strCategoryThumb={data[2]}
                      strCategoryDescription={data[3]}
                    />
                  </Grid>
                );
              })}
            {!loaded && (
              <Paper
                style={{ width: '100%', height: '100vh', padding: '100px' }}
              >
                <LinearProgress />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Main;
