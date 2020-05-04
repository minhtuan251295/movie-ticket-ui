import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from "react-redux";
import { toggleModal } from "../../../actions/main";

import _ from "lodash";

import * as ITF from "../../../interfaces/general";
import GeneralActions from "../../../actions/generalActions";
import ITFGeneralActions from "../../../interfaces/generalActions";

interface IModalCinemaProps {
  cinemas: Array<ITF.Cinema>,
  selectedCinema: ITF.Cinema,
  toggleModal: (value: boolean) => void,
}

const ModalCinema: React.FunctionComponent<IModalCinemaProps & ITFGeneralActions> = (props) => {

  const [dataCinema, setDataCinema] = React.useState({
    name: "",
    address: "",
  } as ITF.Cinema);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataCinema((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const createNewCinema = () => {
    props.createData("cinemas", "cinema", dataCinema);
  }

  const updateNewCinema = () => {
    props.updateData("cinemas", "cinema", dataCinema, _.get(props, "selectedCinema.id", ""))
  }

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedCinema)) {
      setDataCinema((prevState) => ({
        ...prevState,
        name: _.get(props, "selectedCinema.name", ""),
        address: _.get(props, "selectedCinema.address", ""),
      }))
    } else {
      setDataCinema((prevState) => ({
        ...prevState,
        name: "",
        address: "",
      }))
    }
  }, [props.selectedCinema]) // eslint-disable-line

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">
        {_.isEmpty(props.selectedCinema) ? "Add new cinema" : "Update cinema"}
      </DialogTitle>
      <DialogContent>

        <TextField
          id="name" label="Name of Cinema" type="text"
          fullWidth name="name" variant="outlined" className="mb-1" value={dataCinema.name}
          onChange={handleChange}
        />

        <TextField
          id="address" label="Address" type="text"
          fullWidth variant="outlined" name="address" className="mb-1" value={dataCinema.address}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleModal(false)} color="primary">
          Cancel
          </Button>
        {
          _.isEmpty(props.selectedCinema) ?
            <Button onClick={() => {
              props.toggleModal(false);
              createNewCinema();
            }} color="primary">
              Create
          </Button> : <Button onClick={() => {
              props.toggleModal(false);
              updateNewCinema();
            }} color="primary">
              Update
          </Button>
        }
      </DialogActions>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any) => {
  return {
    selectedCinema: state.selectedCinema,
    cinemas: state.cinemas,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(ModalCinema));
