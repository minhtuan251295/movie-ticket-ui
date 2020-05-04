import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.User> = []

const UserReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_USERS:
      return action.payload;

    case Types.CREATE_USER:
      return [...state, action.payload];

    case Types.DELETE_USER:
      return state.filter((User) => User.id !== Number(action.payload));

    case Types.UPDATE_USER:
      let newUsers = [...state];
      let index = newUsers.findIndex((User) => User.id === Number(action.payload.id));
      const newUser = { ...action.payload.data, id: action.payload.id }
      newUsers[index] = newUser;
      return newUsers;

    default:
      return state;
  }
}

export default UserReducer;