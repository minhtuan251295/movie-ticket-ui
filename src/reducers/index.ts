import { combineReducers } from "redux";
import main from "./main";
import GenreReducer from "./genre";
import MovieReducer from "./movie";
import CinemaReducer from "./cinema";
import selectedGenre from "./selectedGenre";
import selectedMovie from "./selectedMovie";
import selectedCinema from "./selectedCinema";

export const rootReducer = combineReducers({
  main: main,
  genres: GenreReducer,
  movies: MovieReducer,
  cinemas: CinemaReducer,
  selectedGenre: selectedGenre,
  selectedMovie: selectedMovie,
  selectedCinema: selectedCinema,
});