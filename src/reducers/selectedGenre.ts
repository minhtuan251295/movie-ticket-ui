import * as Types from "../constants/genre";
import * as ITF from "../interfaces/genre";

const initialState: ITF.Genre = {} as ITF.Genre

const selectedGenre = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_GENRE_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default selectedGenre;