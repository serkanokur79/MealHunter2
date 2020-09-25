import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ShareIcon from '@material-ui/icons/Share';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import { useHistory } from 'react-router-dom';
//import { useStateValue } from './StateProvider';

const useStyles = makeStyles({
  root: {
    borderColor: '#fff',
    margin: 0,
    padding: 20,
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
  },
  clickArea: {
    backgroundColor: 'primary',
    border: 'none',
    margin: 0,
    '&:hover': {
      backgroundColor: '#fff',
      outline: 'none',
    },
  },
  media: {
    height: 200,
    borderRadius: 20,
  },
  noFocus: {
    '&:hover': {
      outline: 'none',
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
  },
});

function CategoryCard({
  idCategory,
  strCategory,
  strCategoryThumb,
  strCategoryDescription,
}) {
  //const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    //dispatch the item into the data layer
    /*dispatch({
      type: 'ADD_TO_CATEGORY_FAVORITES',
      item: {
        idCategory: idCategory,
      },
    });*/
  };

  const [fav, setFav] = useState(false);
  const [liked, setLike] = useState(false);
  const history = useHistory();
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
  const handleCatPage = () => {
    history.push(`/cat/${strCategory}`);
  };

  const classes = useStyles();

  return (
    <Card className='classes.root'>
      <CardActionArea className={classes.clickArea} onClick={handleCatPage}>
        <Paper style={{ height: '100%' }}>
          <CardMedia
            className={classes.media}
            image={strCategoryThumb}
            title={strCategory}
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {strCategory}
            </Typography>
            <Typography variant='caption' color='textSecondary' component='p'>
              {strCategoryDescription?.slice(0, 40)}
            </Typography>
            <Typography variant='caption' color='textSecondary' component='p'>
              {strCategoryDescription?.slice(40, 80)}...
            </Typography>
          </CardContent>
        </Paper>
      </CardActionArea>
      <CardActions disableSpacing className={classes.buttonContainer}>
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
          <Tooltip title='Like' aria-label='Like this category'>
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
          <Tooltip title='Remove Like' aria-label='Remove like'>
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
      </CardActions>
    </Card>
  );
}

export default CategoryCard;
