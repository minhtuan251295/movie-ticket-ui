import { combineReducers } from "redux";
import main from "./main";
import GenreReducer from "./genre";
import MovieReducer from "./movie";
import selectedGenre from "./selectedGenre";
import selectedMovie from "./selectedMovie";

export const rootReducer = combineReducers({
  main: main,
  genres: GenreReducer,
  movies: MovieReducer,
  selectedGenre: selectedGenre,
  selectedMovie: selectedMovie,
});