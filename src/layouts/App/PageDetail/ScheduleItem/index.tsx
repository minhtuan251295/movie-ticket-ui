import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import M from 'moment';
import _ from "lodash";

import * as ITF from "../../../../interfaces/general";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

import api from "../../../../api";
import Seat from "../Seat";
import WeekendOutlinedIcon from "@material-ui/icons/WeekendOutlined";

import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";


interface IScheduleItemProps {
  schedule: ITF.Schedule,
  index: number,
  userInformation: any,
  cards: any
}

const ScheduleItem: React.FunctionComponent<IScheduleItemProps & RouteComponentProps> = (props) => {

  const [open, setOpen] = React.useState(false);
  const [seats, setSeats] = React.useState([]);
  const [selectedSeat, setSelectedSeat] = React.useState({} as any);
  const [alreadySelectedSeats, setAlreadySelectedSeats] = React.useState([] as any);


  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getScheduleDetail = () => {
    api.get(`schedules/${props.schedule.id}/seats`)
      .then((res) => {
        setSeats(res.data);
      })
  }

  const bookTicket = () => {
    if (_.isEmpty(props.userInformation)) {
      alert("You need to login before booking the ticket");
      props.history.push("/signin");
    } else {
      const userId = props.userInformation.id;
      const cardId = props.cards.find((card: any) => card.userId === Number(userId)).id;
      const data = {
        cardId, seatId: selectedSeat.id,
      }
      api.post('tickets', data)
        .then((res) => {
          alert("Booked successfully!");
          setSelectedSeat({})
        })
        .catch((err) => {
          alert("You already booked the maximum today. Please upgrade your membership if needed");
          props.history.push("/membership")
        })
    }
  }

  React.useEffect(() => {
    const bookedSeatCode = _.chain(seats)
      .filter((seat: any) => seat.isBooked === true)
      .map((seat: any) => seat.code)
      .value();
    setAlreadySelectedSeats(bookedSeatCode);
  }, [seats]);

  const getSelectedSeat = (value: any) => {
    setSelectedSeat(value);
  }

  const getSeats = (value: any) => {
    setSeats(value);
  }

  return (
    <React.Fragment >
      <ListItem button onClick={() => { handleClickOpen(); getScheduleDetail() }}>
        <ListItemText primary={`${_.get(props.schedule, "cinema.name", "")} | ${_.get(props.schedule, "roomId", "")}`}
          secondary={M(props.schedule.startTime, "YYYY-MM-DDTHH:mm").format("HH:mm DD/MM/YYYY")} />
      </ListItem>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className="movie-seat"
      >
        <div className="d-flex justify-between flex-center">
          <DialogTitle id="alert-dialog-slide-title">Please choose the seat
          </DialogTitle>
          <div className="d-flex flex-center w-30">
            <WeekendOutlinedIcon color="secondary" className="mr-05" />
            <p className="mr-05">: Selecting</p>
            <WeekendOutlinedIcon color="primary" className="mr-05" />
            <p className="mr-05">: Reserved</p>
            <WeekendOutlinedIcon color="inherit" className="mr-05" />
            <p className="mr-05">: Available</p>
          </div>
        </div>

        <DialogContent>
          <Seat seats={seats}
            selectedSeat={selectedSeat} getSelectedSeat={getSelectedSeat} getSeats={getSeats}
            alreadySelectedSeats={alreadySelectedSeats}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            handleClose();
            bookTicket();
          }} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>

    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userInformation: state.userInformation,
    cards: state.cards
  }
}

export default connect(mapStateToProps)(withRouter(ScheduleItem));
