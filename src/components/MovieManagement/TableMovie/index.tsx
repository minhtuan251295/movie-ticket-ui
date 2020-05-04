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

import _ from "lodash";

import M from "moment/moment";

interface ITableMovieProps {
  movies: Array<ITF.Movie>,
  genres: Array<ITF.Genre>,
  toggleModal: (value: boolean) => void,
}

interface Data {
  name: string,
  director: string,
  genre: number,
  imdb: number,
  premiereDate: string,
  description: string,
  duration: number,
  actions: string,
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name Movie' },
  { id: 'director', numeric: false, label: 'Director' },
  { id: 'genre', numeric: false, label: 'Genre' },
  { id: 'imdb', numeric: true, label: 'Imdb' },
  { id: 'premiereDate', numeric: false, label: 'Premiere date' },
  { id: 'description', numeric: false, label: 'Description' },
  { id: 'duration', numeric: true, label: 'Duration' },
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
    imageMovie: {
      maxWidth: 200,
    },
    button: {
      margin: theme.spacing(1),
    }
  }),
);


const TableMovie: React.FunctionComponent<ITableMovieProps & ITFGeneralActions> = (props) => {
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

  const onDeleteMovie = (id: string) => {
    props.deleteData("movies", "movie", id);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.movies.length - page * rowsPerPage);

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
                rowCount={props.movies.length}
              />
              <TableBody>
                {
                  (props.movies && !_.isEmpty(props.genres)) &&
                  props.movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const genre: any = props.genres.find((genre: ITF.Genre) => genre.id === row.genreId);
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.director}</TableCell>
                          <TableCell align="left">{genre.name}</TableCell>
                          <TableCell align="right">{row.imdb}</TableCell>
                          <TableCell align="left">
                            {M(row.premiereDate, "YYYY-MM-DDTHH:mm:ss").format("DD/MM/YYYY")}
                          </TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="right">{row.duration}</TableCell>
                          <TableCell align="left">
                            <Button color="secondary" onClick={() => onDeleteMovie(row.id?.toString() || "")}>Delete</Button>
                            <Button color="primary" onClick={() => {
                              props.toggleModal(true);
                              props.getDataById("movies", "movie", row.id?.toString() || "")
                            }}>Edit</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
            count={props.movies.length}
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
    movies: state.movies,
    genres: state.genres,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(TableMovie));
