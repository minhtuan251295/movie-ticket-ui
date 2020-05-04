import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: ITF.Movie = {} as ITF.Movie

const selectedMovie = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_MOVIE_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default selectedMovie;