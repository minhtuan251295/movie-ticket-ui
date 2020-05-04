import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.Movie> = []

const MovieReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_MOVIES:
      return action.payload;

    case Types.CREATE_MOVIE:
      return [...state, action.payload];

    case Types.DELETE_MOVIE:
      return state.filter((movie) => movie.id !== Number(action.payload));

    case Types.UPDATE_MOVIE:
      let newMovies = [...state];
      let index = newMovies.findIndex((movie) => movie.id === Number(action.payload.id));
      const newMovie = { ...action.payload.data, id: action.payload.id }
      newMovies[index] = newMovie;
      return newMovies;

    default:
      return state;
  }
}

export default MovieReducer;