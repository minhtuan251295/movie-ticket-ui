import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: ITF.Room = {} as ITF.Room

const selectedRoom = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_ROOM_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default selectedRoom;