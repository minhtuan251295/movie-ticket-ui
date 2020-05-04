import Types from "../constants/general";
import * as ITF from "../interfaces/general";

const initialState: Array<ITF.Schedule> = []

const ScheduleReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Types.GET_SCHEDULES:
      return action.payload;

    case Types.CREATE_SCHEDULE:
      return [...state, action.payload];

    case Types.DELETE_SCHEDULE:
      return state.filter((Schedule) => Schedule.id !== Number(action.payload));

    case Types.UPDATE_SCHEDULE:
      let newSchedules = [...state];
      let index = newSchedules.findIndex((Schedule) => Schedule.id === Number(action.payload.id));
      const newSchedule = { ...action.payload.data, id: action.payload.id }
      newSchedules[index] = newSchedule;
      return newSchedules;

    default:
      return state;
  }
}

export default ScheduleReducer;