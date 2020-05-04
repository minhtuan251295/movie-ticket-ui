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

interface IModalRoomProps {
  rooms: Array<ITF.Room>,
  cinemas: Array<ITF.Cinema>,
  selectedRoom: ITF.Room,
  toggleModal: (value: boolean) => void,
}

const ModalRoom: React.FunctionComponent<IModalRoomProps & ITFGeneralActions> = (props) => {

  const [dataRoom, setDataRoom] = React.useState({
    code: "",
    cinemaId: "",
  } as ITF.Room);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setDataRoom((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const createNewRoom = () => {
    props.createData("rooms", "room", dataRoom);
  }

  const updateNewRoom = () => {
    props.updateData("rooms", "room", dataRoom, _.get(props, "selectedRoom.id", ""))
  }

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedRoom)) {
      setDataRoom((prevState) => ({
        ...prevState,
        code: _.get(props, "selectedRoom.code", ""),
        cinemaId: _.get(props, "selectedRoom.cinemaId", ""),
      }))
    } else {
      setDataRoom((prevState) => ({
        ...prevState,
        code: "",
        cinemaId: "",
      }))
    }
  }, [props.selectedRoom]) // eslint-disable-line


  console.log(props);
  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">
        {_.isEmpty(props.selectedRoom) ? "Add new room" : "Update room"}
      </DialogTitle>
      <DialogContent>

        <TextField
          id="code" label="Code of Room" type="text"
          fullWidth name="code" variant="outlined" className="mb-1" value={dataRoom.code}
          onChange={handleChange}
        />
        <FormControl variant="outlined" className="w-100 mb-1">
          <InputLabel id="select-cinema">Cinema</InputLabel>
          <Select
            labelId="select-cinema"
            id="select-cinema"
            value={dataRoom.cinemaId}
            name="cinemaId"
            onChange={handleChange}
            label="Cinema"
          >
            {
              props.cinemas.map((cinema: ITF.Cinema) => {
                return <MenuItem key={cinema.id} value={cinema.id}>{cinema.name}</MenuItem>
              })
            }
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleModal(false)} color="primary">
          Cancel
          </Button>

        {
          _.isEmpty(props.selectedRoom) ?
            <Button onClick={() => {
              props.toggleModal(false);
              createNewRoom();
            }} color="primary">
              Create
          </Button> : <Button onClick={() => {
              props.toggleModal(false);
              updateNewRoom();
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
    selectedRoom: state.selectedRoom,
    rooms: state.rooms,
    cinemas: state.cinemas,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(ModalRoom));
