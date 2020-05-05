import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import * as ITF from "../../../interfaces/general";
import { connect } from "react-redux";
import _ from "lodash";
import WorkIcon from '@material-ui/icons/Work';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import M from "moment";

interface ScheduleItemProps {
  schedule: ITF.Schedule,
  rooms: Array<ITF.Schedule>,
}
const ScheduleItem = (props: ScheduleItemProps) => {
  const room: any = props.rooms.find((room: ITF.Schedule) => room.id === props.schedule.roomId);
  return (
    <ListItem button>
      <ListItemAvatar>
        <Avatar>
          <WorkIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${_.get(props, "schedule.cinema.name", "")} | ${_.get(room, "code", "")}`}
        secondary={M(props.schedule.startTime, "YYYY-MM-DDTHH:mm:ss").format("HH:mm DD/MM/YYYY")}
      />
    </ListItem>
  );
}

const mapStateToProps = (state: any) => {
  return { rooms: state.rooms }
}

export default connect(mapStateToProps)(ScheduleItem);