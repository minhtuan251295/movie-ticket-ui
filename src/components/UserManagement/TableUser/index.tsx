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

interface ITableUserProps {
  users: Array<ITF.User>,
  toggleModal: (value: boolean) => void,
}

interface Data {
  name: string,
  // password: string,
  email: string | Date,
  actions: string,
}

interface HeadCell {
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'email', numeric: false, label: 'Email' },
  // { id: 'password', numeric: false, label: 'Password' },
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
    imageUser: {
      maxWidth: 200,
    },
    button: {
      margin: theme.spacing(1),
    }
  }),
);


const TableUser: React.FunctionComponent<ITableUserProps & ITFGeneralActions> = (props) => {

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

  const onDeleteUser = (id: string) => {
    props.deleteData("users", "user", id);
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.users.length - page * rowsPerPage);

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
                rowCount={props.users.length}
              />
              <TableBody>
                {
                  props.users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.email}</TableCell>
                          <TableCell align="left">
                            <Button color="secondary" onClick={() => onDeleteUser(row.id?.toString() || "")}>Delete</Button>
                            {/* <Button color="primary" onClick={() => {
                              props.toggleModal(true);
                              props.getDataById("users", "user", row.id?.toString() || "")
                            }}>Edit</Button> */}
                          </TableCell>
                        </TableRow>
                      );
                    })
                }
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
            count={props.users.length}
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
    users: state.users,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(TableUser));
