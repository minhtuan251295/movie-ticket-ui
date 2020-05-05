import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as ITF from "../../../interfaces/general";
import { connect } from "react-redux";
import List from '@material-ui/core/List';
import ScheduleItem from "../ScheduleItem";
import _ from "lodash";
import Grid from '@material-ui/core/Grid';


interface MovieItemProps {
  movie: ITF.Movie,
  schedules: Array<ITF.Schedule>,
}

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  dialogSchedule: {
    maxWidth: 1000,
  }
});

const MovieItem = (props: MovieItemProps) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const length = props.schedules.length / 3;

  const list1 = _.slice(props.schedules, 0, length);
  const list2 = _.slice(props.schedules, length, length + length);
  const list3 = _.slice(props.schedules, length + length, props.schedules.length - 1);

  const renderElm = (list: Array<ITF.Schedule>) => {
    return list.map((schedule: ITF.Schedule) => {
      return (<ScheduleItem key={schedule.id} schedule={schedule} />)
    })
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
          <Button size="small" color="primary" onClick={handleClickOpen}>
            Book now
          </Button>
        </CardActions>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="dialog-schedule"
      >
        <DialogTitle id="alert-dialog-title">{"Please choose the schedule"}</DialogTitle>
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <List>
                {renderElm(list1)}
              </List>
            </Grid>
            <Grid item xs={4}>
              <List>
                {renderElm(list2)}
              </List>
            </Grid>
            <Grid item xs={4}>
              <List>
                {renderElm(list3)}
              </List>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => {
  return { schedules: state.schedules }
}

export default connect(mapStateToProps)(MovieItem);