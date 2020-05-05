import * as React from 'react';

import { RouteComponentProps } from "react-router-dom"
import _ from "lodash";
import GeneralActions from "../../../actions/generalActions";
import ITFGeneralActions from "../../../interfaces/generalActions";
import Container from '@material-ui/core/Container';
import * as ITF from "../../../interfaces/general";

import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import api from "../../../api";

import List from '@material-ui/core/List';
import ScheduleItem from "./ScheduleItem";

interface IPageDetailProps {
  selectedMovie: ITF.Movie,
  genres: Array<ITF.Genre>
  schedules: Array<ITF.Schedule>
}

const PageDetail: React.FunctionComponent<IPageDetailProps & RouteComponentProps & ITFGeneralActions> = (props) => {
  const { params } = props.match;
  const movieId = _.get(params, "filmId", "");

  const [listSchedule, setListSchedule] = React.useState([]);

  React.useEffect(() => {
    props.getDataById("movies", "movie", movieId)
    props.getData("genres");
    props.getData("cards");
    if (movieId) {
      api.get(`movies/${movieId}/schedules`)
        .then((res) => {
          setListSchedule(res.data);
        })
    }
  }, [movieId])// eslint-disable-line

  let selectedGenre: ITF.Genre | undefined = {} as ITF.Genre;
  if (!_.isEmpty(props.selectedMovie) && !_.isEmpty(props.genres)) {
    selectedGenre = props.genres.find((genre: ITF.Genre) => genre.id === props.selectedMovie.genreId)
  }

  const schedulesElm = listSchedule.map((schedule: ITF.Schedule, index) => {
    return <React.Fragment key={schedule.id}>
      <ScheduleItem schedule={schedule} index={index} />
    </React.Fragment>
  })

  return (
    <React.Fragment>
      {
        !_.isEmpty(props.selectedMovie) && !_.isEmpty(props.genres) ?
          <Container maxWidth="md" className="mt-4 py-2">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <img src={props.selectedMovie.imageURL} alt="hinhAnhNe" className="w-100" />
              </Grid>
              <Grid item xs={8}>
                <div className="d-flex-column flex-center h-100">
                  <Typography variant="h4" gutterBottom>
                    {props.selectedMovie.name}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Director : {props.selectedMovie.director}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Duration: {props.selectedMovie.duration} mins
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Genre: {_.get(selectedGenre, "name", "")}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Typography variant="h2" gutterBottom className="mt-3 text-center">
              Schedules
            </Typography>

            <List component="nav" aria-label="secondary mailbox folder">
              {schedulesElm}
            </List>
          </Container> : ""
      }
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    selectedMovie: state.selectedMovie,
    genres: state.genres,
    schedules: state.schedules
  }
}

export default connect(mapStateToProps)(GeneralActions(PageDetail));
