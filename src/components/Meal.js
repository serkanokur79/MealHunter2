import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube-embed';
import { Link, useLocation, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CatPageCol from './CatPageCol';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    marginTop: 10,
  },
  breadcrumbC: {
    margin: 30,
    padding: 20,
  },
  mealPaper: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    margin: '0 auto',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  strMealThumb: {
    height: 300,
    width: 400,
    border: '3px solid black',
    borderRadius: 20,
    boxShadow: 3,
  },
  ImgGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-top',
  },

  summaryContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderTop: '1px solid lightgrey',
    borderBottom: '1px solid lightgrey',
  },
}));
const starLabels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function Meal({ id }) {
  const [meal, setMeal] = useState([]);
  const [yId, setYId] = useState('');
  const [cInstr, setCInstr] = useState('');
  const [noMeal, setNomeal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const mealId = id ? id : location.pathname.split('/')[2];
  const classes = useStyles();
  const [starValue, setStarValue] = React.useState(0);
  const [starHover, setStarHover] = React.useState(-1);

  const [fav, setFav] = useState(false);
  const [liked, setLike] = useState(false);

  const addToFavorite = () => {
    setFav(true);
  };
  const removeFavorite = () => {
    setFav(false);
  };
  const addToLikeList = () => {
    setLike(true);
  };
  const removeFromLikeList = () => {
    setLike(false);
  };
  useEffect(() => {
    //console.log('location===>', location);
    // console.log('mealID===>', mealId);
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    //console.log(apiUrl);
    //console.log('loaded====>', loaded);

    const fetchData = async () => {
      const result = await axios.get(apiUrl);
      //console.log(Object.values(result.data)[0]);
      if (result.data.meals) {
        setMeal(result.data.meals[0]);
        setLoaded(true);
        setYId(
          result.data.meals[0].strYoutube === ''
            ? ''
            : result.data.meals[0].strYoutube.split('=')[1]
        );
        setCInstr(result.data.meals[0].strInstructions);
      } else {
        setNomeal(true);
      }
    };
    fetchData();
  }, [mealId]);

  const Ingredients = [];
  for (let i = 1; i < 20; i++) {
    const ing = 'strIngredient' + i;
    const mes = 'strMeasure' + i;
    if (meal[ing] !== '') {
      Ingredients.push([meal[mes], meal[ing]]);
    }
    //console.log(meal[mes] + ' ' + meal[ing]);
  }
  const addToBasket = () => {
    //dispatch the item into the data layer
    /*dispatch({
      type: 'ADD_TO_CATEGORY_FAVORITES',
      item: {
        idCategory: idCategory,
      },
    });*/
  };

  return loaded ? (
    <div className={classes.root}>
      <Breadcrumbs
        separator='›'
        aria-label='breadcrumb'
        className='classes.breadcrumbC'
      >
        <Link color='inherit' href='/' onClick={() => history.push('/')}>
          Meal Hunter
        </Link>
        <Link
          color='inherit'
          href='/cat/Beef'
          onClick={() => history.push(`/cat/${meal.strCategory}`)}
        >
          {meal.strCategory}
        </Link>
        <Typography color='textPrimary'>{meal.strMeal}</Typography>
      </Breadcrumbs>
      <div>
        <Grid container>
          <Grid container xs={12} lg={9}>
            <Paper className={classes.mealPaper}>
              <Grid item xs={12} container spacing={3}>
                <Grid item xs={12} container>
                  <Grid item xs={12} container>
                    <Grid item xs={8}>
                      <h3>{meal.strMeal}</h3>
                    </Grid>
                    <Grid item xs={4}>
                      <Button href={meal.strSource} target='_blank'>
                        Original Website
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  xs={12}
                  container
                  className={classes.summaryContainer}
                  spacing={2}
                >
                  <Grid item xs={12} lg={6} className={classes.ImgGrid}>
                    <img
                      className={classes.strMealThumb}
                      src={meal.strMealThumb}
                      alt='Logo'
                    />
                  </Grid>
                  <Grid item xs={12} lg={6} container spacing={3}>
                    <Grid item xs={12}>
                      <b>Category:</b> {meal.strCategory}
                    </Grid>
                    <Grid item xs={12}>
                      <b>Origin:</b> {meal.strArea}
                    </Grid>
                    <Grid item xs={12} lg={6} container>
                      <Grid item xs={12}>
                        <Box
                          component='fieldset'
                          mb={3}
                          borderColor='#121212'
                          className={classes.buttonContainer}
                        >
                          <Typography component='legend'>
                            Your rating:{' '}
                            {starValue !== null &&
                              starLabels[
                                starHover !== -1 ? starHover : starValue
                              ]}
                          </Typography>
                          <Rating
                            name='hover-feedback'
                            value={starValue}
                            precision={0.5}
                            onChange={(event, newValue) => {
                              setStarValue(newValue);
                            }}
                            onChangeActive={(event, newHover) => {
                              setStarHover(newHover);
                            }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box component='fieldset' mb={3} borderColor='#121212'>
                          <Typography component='legend'>
                            Like and Share
                          </Typography>
                          {!fav && (
                            <Tooltip
                              title='Add to favorites'
                              aria-label='Add to favorites'
                              placement='bottom'
                            >
                              <IconButton
                                color='inherit'
                                className={classes.noFocus}
                                onClick={addToFavorite}
                              >
                                <FavoriteBorderIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {fav && (
                            <Tooltip
                              title='Remove from favorites'
                              aria-label='Remove from favorites'
                            >
                              <IconButton
                                color='inherit'
                                className={classes.noFocus}
                                onClick={removeFavorite}
                              >
                                <FavoriteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {!liked && (
                            <Tooltip
                              title='Like'
                              aria-label='Like this category'
                            >
                              <IconButton
                                color='inherit'
                                className={classes.noFocus}
                                onClick={addToLikeList}
                              >
                                <ThumbUpAltOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {liked && (
                            <Tooltip
                              title='Remove Like'
                              aria-label='Remove like'
                            >
                              <IconButton
                                color='inherit'
                                className={classes.noFocus}
                                onClick={removeFromLikeList}
                              >
                                <ThumbUpIcon />
                              </IconButton>
                            </Tooltip>
                          )}

                          <Tooltip title='Share' aria-label='Share'>
                            <IconButton
                              color='inherit'
                              className={classes.noFocus}
                              onClick={addToBasket}
                            >
                              <ShareIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item container xs={10}>
                <Grid item xs={12}>
                  <b>Ingredients:</b>
                  <Grid item xs={12}>
                    <ul>
                      {Ingredients?.map((value, index) => (
                        <li key={index}>
                          {value[0]} {value[1]}
                        </li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={10} container spacing={0}>
                <Grid item xs={10}>
                  <b>Instructions:</b>
                  <ol>
                    {cInstr.split('.').map((item, i) => (
                      <li key={i}> {item}.</li>
                    ))}
                  </ol>
                </Grid>

                <Grid item xs={12}>
                  <h6>Cooking Video:</h6>
                  <div>
                    {yId !== '' ? (
                      <YouTube id={yId} />
                    ) : (
                      <h3>Video doesnt exist!</h3>
                    )}
                    <p />
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid container xs={12} lg={3}>
            <CatPageCol catName={meal.strCategory} foodId={meal.idMeal} />
          </Grid>
        </Grid>
      </div>
    </div>
  ) : noMeal ? (
    <div>
      <p>
        No meal with this code . Return to main page or search using the top
        search bar
      </p>
    </div>
  ) : (
    <Paper style={{ width: '100%', height: '100vh', padding: '100px' }}>
      <LinearProgress />
    </Paper>
  );
}

export default Meal;
