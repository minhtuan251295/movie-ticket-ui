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

import Dialog from '@material-ui/core/Dialog';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from '@material-ui/core/IconButton';



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
  const [open, setOpen] = React.useState(false);

  const goToPageDetail = () => {
    props.history.push(`/film/${props.movie.id}`)
  }

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea onClick={handleClickOpen}>
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

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} className="dialog-trailer">
        <iframe title={props.movie.name} width="900" height="530" src={props.movie.trailerURL} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        <IconButton autoFocus onClick={handleClose} color="primary">
          <CloseIcon />
        </IconButton>
      </Dialog>
    </React.Fragment>
  );
}

export default withRouter(MovieItem);