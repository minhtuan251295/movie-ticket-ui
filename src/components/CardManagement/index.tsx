import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import Typography from '@material-ui/core/Typography';


import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TableCard from './TableCard';

import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    }
  }),
);

interface ICardProps {
  toggleModal: (value: boolean) => void
}

const CardManagement: React.FunctionComponent<ICardProps & ITFGeneralActions> = (props) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className="content-admin__header">
        <Typography variant="h4" gutterBottom>
          All Cards
        </Typography>
      </div>
      <TableCard />

    </React.Fragment>
  );
};

export default connect(null, { toggleModal })(GeneralActions(CardManagement));
