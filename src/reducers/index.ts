import { combineReducers } from "redux";
import main from "./main";
import GenreReducer from "./genre";
import MovieReducer from "./movie";
import CinemaReducer from "./cinema";
import RoomReducer from "./room";
import UserReducer from "./user";
import CardReducer from "./card";

import ScheduleReducer from "./schedules";
import selectedGenre from "./selectedGenre";
import selectedMovie from "./selectedMovie";
import selectedCinema from "./selectedCinema";
import selectedRoom from "./selectedRoom";
import selectedSchedule from "./selectedSchedule";
import selectedUser from "./selectedUser";

import UserInformation from "./auth";


export const rootReducer = combineReducers({
  main: main,
  genres: GenreReducer,
  movies: MovieReducer,
  cinemas: CinemaReducer,
  rooms: RoomReducer,
  users: UserReducer,
  cards: CardReducer,
  schedules: ScheduleReducer,
  selectedGenre: selectedGenre,
  selectedMovie: selectedMovie,
  selectedCinema: selectedCinema,
  selectedRoom: selectedRoom,
  selectedSchedule: selectedSchedule,
  selectedUser: selectedUser,
  userInformation: UserInformation
});