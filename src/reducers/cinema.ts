import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.Cinema> = []

const CinemaReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_CINEMAS:
      return action.payload;

    case Types.CREATE_CINEMA:
      return [...state, action.payload];

    case Types.DELETE_CINEMA:
      return state.filter((cinema) => cinema.id !== Number(action.payload));

    case Types.UPDATE_CINEMA:
      let newCinemas = [...state];
      let index = newCinemas.findIndex((cinema) => cinema.id === Number(action.payload.id));
      const newCinema = { ...action.payload.data, id: action.payload.id }
      newCinemas[index] = newCinema;
      return newCinemas;

    default:
      return state;
  }
}

export default CinemaReducer;