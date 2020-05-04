import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.Card> = []

const CardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_CARDS:
      return action.payload;

    default:
      return state;
  }
}

export default CardReducer;