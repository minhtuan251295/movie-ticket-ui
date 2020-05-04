import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


import { connect } from "react-redux";
import { toggleModal } from "../../../actions/main";

import _ from "lodash";

import * as ITF from "../../../interfaces/general";
import GeneralActions from "../../../actions/generalActions";
import ITFGeneralActions from "../../../interfaces/generalActions";

import M from "moment";

interface IModalScheduleProps {
  schedules: Array<ITF.Schedule>,
  movies: Array<ITF.Movie>,
  rooms: Array<ITF.Room>,
  selectedSchedule: ITF.Schedule,
  toggleModal: (value: boolean) => void,
}

const ModalSchedule: React.FunctionComponent<IModalScheduleProps & ITFGeneralActions> = (props) => {

  const [dataSchedule, setDataSchedule] = React.useState({
    movieId: "",
    roomId: "",
    startTime: new Date(),
  } as ITF.Schedule);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDataSchedule((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const createNewSchedule = () => {
    const time = new Date(dataSchedule.startTime);
    dataSchedule.startTime = time;
    props.createData("schedules", "schedule", dataSchedule);
  }

  const updateNewSchedule = () => {
    props.updateData("schedules", "schedule", dataSchedule, _.get(props, "selectedSchedule.id", ""))
  }

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedSchedule)) {
      setDataSchedule((prevState) => ({
        ...prevState,
        movieId: _.get(props, "selectedSchedule.movieId", ""),
        roomId: _.get(props, "selectedSchedule.roomId", ""),
        startTime: _.get(props, "selectedSchedule.startTime", ""),
      }))
    } else {
      setDataSchedule((prevState) => ({
        ...prevState,
        movieId: "",
        roomId: "",
        startTime: new Date(),
      }))
    }
  }, [props.selectedSchedule]) // eslint-disable-line


  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">
        {_.isEmpty(props.selectedSchedule) ? "Add new schedule" : "Update schedule"}
      </DialogTitle>
      <DialogContent>

        <FormControl variant="outlined" className="w-100 mb-1">
          <InputLabel id="select-movie">Movie</InputLabel>
          <Select
            labelId="select-movie"
            id="select-movie"
            value={dataSchedule.movieId}
            name="movieId"
            onChange={handleChange}
            label="Movie"
          >
            {
              props.movies.map((movie: ITF.Movie) => {
                return <MenuItem key={movie.id} value={movie.id}>{movie.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <FormControl variant="outlined" className="w-100 mb-1">
          <InputLabel id="select-room">Room</InputLabel>
          <Select
            labelId="select-room"
            id="select-room"
            value={dataSchedule.roomId}
            name="roomId"
            onChange={handleChange}
            label="Room"
          >
            {
              props.rooms.map((room: ITF.Room) => {
                return <MenuItem key={room.id} value={room.id}>{room.code}</MenuItem>
              })
            }
          </Select>
        </FormControl>

        <form className="mb-1 w-100" noValidate>
          <TextField
            id="schedule-time"
            label="Start time"
            type="datetime-local"
            value={M(dataSchedule.startTime).format("YYYY-MM-DDTHH:mm")}
            className="w-100"
            onChange={handleChange}
            name="startTime"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </form>

      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleModal(false)} color="primary">
          Cancel
          </Button>

        {
          _.isEmpty(props.selectedSchedule) ?
            <Button onClick={() => {
              props.toggleModal(false);
              createNewSchedule();
            }} color="primary">
              Create
          </Button> : <Button onClick={() => {
              props.toggleModal(false);
              updateNewSchedule();
            }} color="primary">
              Update
          </Button>
        }
      </DialogActions>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    selectedSchedule: state.selectedSchedule,
    schedules: state.schedules,
    rooms: state.rooms,
    movies: state.movies,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(ModalSchedule));
