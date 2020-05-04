import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import Typography from '@material-ui/core/Typography';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableCinema from './TableCinema';
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

interface ICinemaProps {
  toggleModal: (value: boolean) => void
}

const CinemaManagement: React.FunctionComponent<ICinemaProps & ITFGeneralActions> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="content-admin__header">
        <Typography variant="h4" gutterBottom>
          All Cinemas
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<AddCircleOutline />}
          onClick={() => {
            props.toggleModal(true);
            props.resetData("cinema")
          }}
        >
          New Cinema
        </Button>
      </div>
      <Modal />
      <TableCinema />
    </React.Fragment>
  );
};

export default connect(null, { toggleModal })(GeneralActions(CinemaManagement));
