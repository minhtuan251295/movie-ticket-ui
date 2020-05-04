import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: ITF.Schedule = {} as ITF.Schedule

const selectedSchedule = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_SCHEDULE_BY_ID:
      return action.payload;

    default:
      return state;
  }
}

export default selectedSchedule;