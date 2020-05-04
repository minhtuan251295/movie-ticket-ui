import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.Genre> = []

const GenreReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_GENRES:
      return action.payload;

    case Types.CREATE_GENRE:
      return [...state, action.payload];

    case Types.DELETE_GENRE:
      return state.filter((genre) => genre.id !== Number(action.payload));

    case Types.UPDATE_GENRE:
      let newGenres = [...state];
      let index = newGenres.findIndex((genre) => genre.id === Number(action.payload.id));
      const newGenre = { ...action.payload.data, id: action.payload.id }
      newGenres[index] = newGenre;
      return newGenres;

    default:
      return state;
  }
}

export default GenreReducer;