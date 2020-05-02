import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import * as ITF from "../../interfaces/genre";
import Typography from '@material-ui/core/Typography';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableGenre from './TableGenre';
import Modal from '../Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  }),
);

interface IGenreProps {
  genres: Array<ITF.Genre>,
  toggleModal: (value: boolean) => void
}

const GenreManagement: React.FunctionComponent<IGenreProps> = (props) => {
  const classes = useStyles();
  const data = props.genres;

  return (
    <React.Fragment>
      <div className="content-admin__header">
        <Typography variant="h4" gutterBottom>
          All genres
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutline />}
          onClick={() => props.toggleModal(true)}
        >
          New Genre
        </Button>
      </div>
      <Modal />
      <TableGenre data={data} />

    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return { genres: state.genres }
}

export default connect(mapStateToProps, { toggleModal })(GenreManagement);
