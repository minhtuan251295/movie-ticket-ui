import * as React from 'react';
import { connect } from "react-redux";
import * as ITF from "../../interfaces/general";
import MovieItem from './MovieItem';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

interface IMoviesProps {
  movies: Array<ITF.Movie>
}

const Movies: React.FunctionComponent<IMoviesProps> = (props) => {
  const elmMovie = props.movies.map((movie: ITF.Movie) => {
    return <Grid item xs={4} key={movie.id}>
      <MovieItem movie={movie} />
    </Grid>
  })
  return (
    <React.Fragment>
      <CssBaseline />
      <Typography variant="h3" className="my-2 text-center  ">
        List of Movie
      </Typography>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {elmMovie}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { movies: state.movies }
}
export default connect(mapStateToProps)(Movies);
