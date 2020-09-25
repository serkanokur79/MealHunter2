import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import Avatar from '@material-ui/core/Avatar';

import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    flexDirection: 'column',

    display: 'flex',
    padding: 20,
    justifyItems: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: 350,
  },

  link: {
    textDecoration: 'none',
  },
  cardLink: {
    cursor: 'pointer',
  },
  media: {
    height: 150,
  },
  avatar: {
    backgroundColor: '#343434',
  },
}));

function CatPage({ catName, foodId }) {
  const [meals, setMeals] = useState([]);
  const [noCat, setNocat] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const catNameChecked = catName ? catName : location.pathname.split('/')[2];
  //console.log(apiUrl);
  useEffect(() => {
    //console.log('loaded====>', loaded);
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catNameChecked}`;
    const fetchData = async () => {
      const result = await axios.get(apiUrl);
      const data = Object.values(result.data.meals);
      // console.log('data===>', data);
      // console.log('1==>', data[0].strMeal);
      const mealsDownladed = [];
      data.forEach((meal) => mealsDownladed.push(meal));
      //console.log(mealsDownladed);
      //console.log('foodId', foodId);
      const mealsSelected = mealsDownladed
        .filter((meal) => meal.idMeal !== foodId)
        .slice(0, 8);
      //console.log('mealsSeleceted', mealsSelected);
      if (result) {
        setMeals(mealsSelected);
        setLoaded(true);
        //console.log('meals =====>', meals);
      } else {
        setNocat(true);
      }
    };
    fetchData();
  }, [foodId]);

  return loaded ? (
    <Paper className={classes.root}>
      <Typography variant='h5' color='textPrimary'>
        More {catNameChecked} meals:
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {Object.values(meals).map((meal, index) => (
              <Grid
                item
                key={index}
                xs={12}
                className={classes.cardLink}
                onClick={() => history.push(`/meal/${meal.idMeal}`)}
              >
                <Card variant='outlined' className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar
                        className={classes.avatar}
                        aria-label='meal'
                        src={`${meal.strMealThumb}`}
                      ></Avatar>
                    }
                    title={
                      meal.strMeal.length > 20
                        ? `${meal.strMeal.slice(0, 19)}...`
                        : meal.strMeal
                    }
                    subheader={catName}
                  />
                  <CardMedia
                    className={classes.media}
                    image={meal.strMealThumb}
                    title={meal.strMeal}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ) : noCat ? (
    <Paper style={{ width: '100%', height: '100%' }}>
      <div>
        <p>
          This category doesnt exist on the system . Return to main page or
          search using the top search bar
        </p>
      </div>
    </Paper>
  ) : (
    <Paper style={{ width: '100%', height: '100%' }}>
      <CircularProgress disableShrink />;
    </Paper>
  );
}

export default CatPage;
