import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import WeekendOutlinedIcon from "@material-ui/icons/WeekendOutlined";

import _ from "lodash";

interface ISeatProps {
  seats: any,
  selectedSeat: any,
  getSelectedSeat: any,
  getSeats: any,
  alreadySelectedSeats: any
}

const Seat: React.FunctionComponent<ISeatProps> = (props) => {

  const setA = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("A") !== -1;
  })

  const setB = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("B") !== -1;
  })

  const setC = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("C") !== -1;
  })

  const setD = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("D") !== -1;
  })

  const setE = _.filter(props.seats, (seat: any) => {
    return seat.code.indexOf("E") !== -1;
  })

  const renderSeat = (seatList: Array<any>) => {
    return seatList.map((seat: any) => {
      const index = _.findIndex(props.alreadySelectedSeats, (seatItem) => seatItem === seat.code);
      const color = !seat.isBooked ? "inherit" : (index !== -1 ? "primary" : "secondary");
      return <React.Fragment key={seat.id}>
        <IconButton onClick={() => onChooseSeat(seat.id)} className={`${index !== -1 ? "preventClick" : ""}`}>
          <WeekendOutlinedIcon color={color} />
        </IconButton>
        {seat.code}
      </React.Fragment>
    })
  }

  const onChooseSeat = (id: string) => {
    const seatIndex: any = _.findIndex(props.seats, (seat: any) => seat.id === id);
    let selectedSeat: any = props.seats[seatIndex];
    if (selectedSeat.isBooked) {
      selectedSeat.isBooked = false;
      props.getSelectedSeat({});
    }
    else {
      if (props.selectedSeat.id !== id && !_.isEmpty(props.selectedSeat)) {
        alert("You only choose one seat!");
      } else {
        selectedSeat.isBooked = true;
        props.getSelectedSeat(selectedSeat);
      }
    }
  }

  return (
    <div className="bus-seats">
      <div className="mb-2 text-center">Monitor here</div>
      <div>
        {renderSeat(setA)}
      </div>
      <div>
        {renderSeat(setB)}
      </div>
      <div>
        {renderSeat(setC)}
      </div>
      <div>
        {renderSeat(setD)}
      </div>
      <div>
        {renderSeat(setE)}
      </div>
    </div>
  );
};

export default Seat;
