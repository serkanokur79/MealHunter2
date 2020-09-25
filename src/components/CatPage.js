import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NotFound from './NotFound';
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
  },
  breadcrumbC: { marginTop: 30 },
  card: {
    maxWidth: 450,
  },
  catpage__image: {
    zIndex: -1,
    width: '1450px',
    marginBottom: '-1350px',
    maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
  },
  link: {
    textDecoration: 'none',
  },
  cardLink: {
    cursor: 'pointer',
  },
  media: {
    height: 350,
  },
  avatar: {
    backgroundColor: '#343434',
  },
}));

function CatPage({ catName }) {
  const [meals, setMeals] = useState([]);
  const [noCat, setNocat] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const catNameChecked = catName ? catName : location.pathname.split('/')[2];

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${catNameChecked}`;
  console.log(apiUrl);
  useEffect(() => {
    console.log('loaded====>', loaded);
    const fetchData = async () => {
      try {
        const result = await axios.get(apiUrl);
        const data = Object.values(result.data.meals);
        console.log('data===>', data);
        console.log('1==>', data[0].strMeal);
        const mealsDownladed = [];
        data.forEach((meal) => mealsDownladed.push(meal));
        console.log(mealsDownladed);
        if (result) {
          setMeals(mealsDownladed);
          setLoaded(true);
          console.log('meals =====>', meals);
        } else {
          setNocat(true);
        }
      } catch (err) {
        setNocat(true);
      }
    };
    fetchData();

    //console.log('youtube====>', meal.strYoutube);
  }, [catNameChecked]);

  return loaded ? (
    <div>
      <Breadcrumbs
        separator='›'
        aria-label='breadcrumb'
        className={classes.breadcrumbC}
      >
        <Link color='inherit' href='/' onClick={() => history.push('/')}>
          Meal Hunter
        </Link>
        <Typography color='textPrimary'>{catNameChecked}</Typography>
      </Breadcrumbs>
      <Typography variant='h4' color='textPrimary'>
        Meals in {catNameChecked} category:
      </Typography>
      <Paper className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {Object.values(meals).map((meal, index) => (
                <Grid
                  item
                  key={index}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className={classes.cardLink}
                  onClick={() => history.push(`/meal/${meal.idMeal}`)}
                >
                  <Card variant='outlined' className={classes.card}>
                    <CardMedia
                      className={classes.media}
                      image={meal.strMealThumb}
                      title={meal.strMeal}
                    />
                    <CardHeader
                      avatar={
                        <Avatar
                          className={classes.avatar}
                          aria-label='meal'
                          src={`${meal.strMealThumb}`}
                        ></Avatar>
                      }
                      action={
                        <IconButton aria-label='settings'>
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={
                        meal.strMeal.length > 20
                          ? `${meal.strMeal.slice(0, 19)}...`
                          : meal.strMeal
                      }
                      subheader={catName}
                    />

                    {/* <CardContent>{meal.strMeal}</CardContent> */}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  ) : noCat ? (
    <NotFound />
  ) : (
    <Paper style={{ width: '100%', height: '100vh', padding: '100px' }}>
      <LinearProgress />
    </Paper>
  );
}

export default CatPage;
