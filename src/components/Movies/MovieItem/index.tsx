import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import * as ITF from "../../../interfaces/general";
import { withRouter, RouteComponentProps } from "react-router-dom";

interface MovieItemProps {
  movie: ITF.Movie,
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  dialogSchedule: {
    maxWidth: 1000,
  }
});

const MovieItem = (props: MovieItemProps & RouteComponentProps) => {
  const classes = useStyles();

  const goToPageDetail = () => {
    props.history.push(`/film/${props.movie.id}`)
  }
  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="180"
            image={props.movie.imageURL}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.movie.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={goToPageDetail}>
            Go to detail
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default withRouter(MovieItem);