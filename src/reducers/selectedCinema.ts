import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: ITF.Cinema = {} as ITF.Cinema

const selectedCinema = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_CINEMA_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default selectedCinema;