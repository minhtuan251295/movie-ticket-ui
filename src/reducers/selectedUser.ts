import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: ITF.User = {} as ITF.User

const selectedUser = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_USER_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default selectedUser;