import * as React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";
import * as ITF from "../../../interfaces/general";
import { toggleModal } from "../../../actions/main";

import GeneralActions from "../../../actions/generalActions";
import ITFGeneralActions from "../../../interfaces/generalActions";

import M from "moment";
import _ from "lodash";

interface ITableScheduleProps {
  schedules: Array<ITF.Schedule>,
  rooms: Array<ITF.Room>,
  movies: Array<ITF.Movie>,
  toggleModal: (value: boolean) => void,
}

interface Data {
  movie: string,
  room: string,
  startTime: string | Date,
  actions: string,
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'movie', numeric: false, label: 'Movie' },
  { id: 'room', numeric: false, label: 'Room' },
  { id: 'startTime', numeric: false, label: 'Start time' },
  { id: 'actions', numeric: false, label: 'Actions' },
];

interface EnhancedTableHeadProps {
  classes: ReturnType<typeof useStyles>;
  rowCount: number;
}

const EnhancedTableHead = (props: EnhancedTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    imageSchedule: {
      maxWidth: 200,
    },
    button: {
      margin: theme.spacing(1),
    }
  }),
);


const TableSchedule: React.FunctionComponent<ITableScheduleProps & ITFGeneralActions> = (props) => {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onDeleteSchedule = (id: string) => {
    props.deleteData("schedules", "schedule", id);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.schedules.length - page * rowsPerPage);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                rowCount={props.schedules.length}
              />
              <TableBody>
                {
                  (props.schedules && !_.isEmpty(props.movies) && !_.isEmpty(props.rooms)) ?
                    (
                      props.schedules.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          const movie: any = props.movies.find((movie: ITF.Movie) => movie.id === row.movieId);
                          const room: any = props.rooms.find((room: ITF.Room) => room.id === row.roomId);
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={index}
                            >
                              <TableCell align="left">{movie.name}</TableCell>
                              <TableCell align="left">{_.get(room, "code", "")}</TableCell>
                              <TableCell align="left">
                                {M(row.startTime, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY HH:mm")}
                              </TableCell>
                              <TableCell align="left">
                                <Button color="secondary" onClick={() => onDeleteSchedule(row.id?.toString() || "")}>Delete</Button>
                                <Button color="primary" onClick={() => {
                                  props.toggleModal(true);
                                  props.getDataById("schedules", "schedule", row.id?.toString() || "")
                                }}>Edit</Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                    )
                    : <React.Fragment></React.Fragment>}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={props.schedules.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    schedules: state.schedules,
    movies: state.movies,
    rooms: state.rooms,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(TableSchedule));
