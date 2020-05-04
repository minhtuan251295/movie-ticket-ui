import * as React from 'react';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";

import Typography from '@material-ui/core/Typography';
import TableCard from './TableCard';

import GeneralActions from "../../actions/generalActions";
import ITFGeneralActions from "../../interfaces/generalActions";


interface ICardProps {
  toggleModal: (value: boolean) => void
}

const CardManagement: React.FunctionComponent<ICardProps & ITFGeneralActions> = (props) => {

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
