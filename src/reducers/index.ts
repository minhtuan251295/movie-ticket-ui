import { combineReducers } from "redux";
import main from "./main";
import GenreReducer from "./genre";
import selectedGenre from "./selectedGenre";


export const rootReducer = combineReducers({
  main: main,
  genres: GenreReducer,
  selectedGenre: selectedGenre,
});