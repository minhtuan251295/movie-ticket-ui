import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { connect } from "react-redux";
import { toggleModal } from "../../../actions/main";

import _ from "lodash";

import * as ITF from "../../../interfaces/general";
import GeneralActions from "../../../actions/generalActions";
import ITFGeneralActions from "../../../interfaces/generalActions";
import Grid from '@material-ui/core/Grid';

import M from "moment";

interface IModalMovieProps {
  genres: Array<ITF.Genre>,
  movies: Array<ITF.Movie>,
  selectedMovie: ITF.Movie,
  toggleModal: (value: boolean) => void,
}

const ModalMovie: React.FunctionComponent<IModalMovieProps & ITFGeneralActions> = (props) => {

  const [dataMovie, setDataMovie] = React.useState({
    name: "",
    director: "",
    imageURL: "",
    genreId: 0,
    imdb: 0,
    duration: 0,
    description: "",
    premiereDate: new Date(),
  } as ITF.Movie);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDataMovie((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const createNewMovie = () => {
    const imdb = Number(dataMovie.imdb);
    const date = new Date(dataMovie.premiereDate);
    const duration = Number(dataMovie.duration);
    dataMovie.imdb = imdb;
    dataMovie.premiereDate = date;
    dataMovie.duration = duration;
    props.createData("movies", "movie", dataMovie);
  }

  const updateNewMovie = () => {
    props.updateData("movies", "movie", dataMovie, _.get(props, "selectedMovie.id", ""))
  }

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedMovie)) {
      setDataMovie((prevState) => ({
        ...prevState,
        name: _.get(props, "selectedMovie.name", ""),
        director: _.get(props, "selectedMovie.director", ""),
        imageURL: _.get(props, "selectedMovie.imageURL", ""),
        genreId: _.get(props, "selectedMovie.genreId", ""),
        imdb: _.get(props, "selectedMovie.imdb", 0),
        duration: _.get(props, "selectedMovie.duration", 0),
        description: _.get(props, "selectedMovie.description", 0),
        premiereDate: _.get(props, "selectedMovie.premiereDate"),
      }))
    } else {
      setDataMovie((prevState) => ({
        ...prevState,
        name: "",
        director: "",
        genreId: 0,
        imageURL: "",
        imdb: 0,
        duration: 0,
        description: "",
        premiereDate: new Date(),
      }))
    }
  }, [props.selectedMovie]) // eslint-disable-line

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">
        {_.isEmpty(props.selectedMovie) ? "Add new movie" : "Update movie"}
      </DialogTitle>
      <DialogContent>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              id="name" label="Name of movie" type="text"
              fullWidth name="name" variant="outlined" className="mb-1" value={dataMovie.name}
              onChange={handleChange}
            />

            <TextField
              id="director" label="Director" type="text"
              fullWidth variant="outlined" name="director" className="mb-1" value={dataMovie.director}
              onChange={handleChange}
            />

            <FormControl variant="outlined" className="w-100 mb-1">
              <InputLabel id="select-genre">Genre</InputLabel>
              <Select
                labelId="select-genre"
                id="select-genre"
                value={dataMovie.genreId}
                name="genreId"
                onChange={handleChange}
                label="Genre"
              >
                {
                  props.genres.map((genre: ITF.Genre) => {
                    return <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                  })
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="imdb" label="Imdb" type="text"
              fullWidth variant="outlined" name="imdb" className="mb-1" value={dataMovie.imdb}
              onChange={handleChange}
            />

            <TextField
              id="duration" label="Duration" type="number"
              fullWidth variant="outlined" name="duration" className="mb-1" value={dataMovie.duration}
              onChange={handleChange}
            />

            <form className="mb-1 w-100" noValidate>
              <TextField
                id="date"
                label="Premiere Date"
                type="date"
                className="w-100"
                defaultValue={M(dataMovie.premiereDate).format("YYYY-MM-DD")}
                name="premiereDate"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange}
              />
            </form>
          </Grid>

          <Grid item xs={12}>
            <TextField
              id="imageURL" label="URL of image" type="text"
              fullWidth variant="outlined" name="imageURL" className="mb-1" value={dataMovie.imageURL}
              onChange={handleChange}
            />

            <TextField id="description" label="Description" className="mb-1 w-100"
              multiline rows={3} value={dataMovie.description} name="description"
              variant="outlined" onChange={handleChange}
            />
          </Grid>
        </Grid>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleModal(false)} color="primary">
          Cancel
          </Button>

        {
          _.isEmpty(props.selectedMovie) ?
            <Button onClick={() => {
              props.toggleModal(false);
              createNewMovie();
            }} color="primary">
              Create
          </Button> : <Button onClick={() => {
              props.toggleModal(false);
              updateNewMovie();
            }} color="primary">
              Update
          </Button>
        }
      </DialogActions>
    </React.Fragment >
  );
};

const mapStateToProps = (state: any) => {
  return {
    selectedMovie: state.selectedMovie,
    genres: state.genres,
    movies: state.movies,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(ModalMovie));
