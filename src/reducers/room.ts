import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.Room> = []

const RoomReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_ROOMS:
      return action.payload;

    case Types.CREATE_ROOM:
      return [...state, action.payload];

    case Types.DELETE_ROOM:
      return state.filter((Room) => Room.id !== Number(action.payload));

    case Types.UPDATE_ROOM:
      let newRooms = [...state];
      let index = newRooms.findIndex((Room) => Room.id === Number(action.payload.id));
      const newRoom = { ...action.payload.data, id: action.payload.id }
      newRooms[index] = newRoom;
      return newRooms;

    default:
      return state;
  }
}

export default RoomReducer;