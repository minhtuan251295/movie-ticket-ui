import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import Typography from '@material-ui/core/Typography';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableMovie from './TableMovie';
import Modal from '../Modal';

import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  }),
);

interface IMovieProps {
  toggleModal: (value: boolean) => void
}

const MovieManagement: React.FunctionComponent<IMovieProps & ITFGeneralActions> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="content-admin__header">
        <Typography variant="h4" gutterBottom>
          All movies
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutline />}
          onClick={() => {
            props.toggleModal(true);
            props.resetData("movie")
          }}
        >
          New movie
        </Button>
      </div>
      <Modal />
      <TableMovie />

    </React.Fragment>
  );
};

export default connect(null, { toggleModal })(GeneralActions(MovieManagement));
