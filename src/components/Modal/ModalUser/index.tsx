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

interface IModalUserProps {
  users: Array<ITF.User>,
  selectedUser: ITF.User,
  toggleModal: (value: boolean) => void,
}

const ModalUser: React.FunctionComponent<IModalUserProps & ITFGeneralActions> = (props) => {

  const [dataUser, setDataUser] = React.useState({
    name: "",
    email: "",
    password: "",
  } as ITF.User);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataUser((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const createNewUser = () => {
    props.createData("users", "user", dataUser);
  }

  const updateNewUser = () => {
    props.updateData("users", "user", dataUser, _.get(props, "selectedUser.id", ""))
  }

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedUser)) {
      setDataUser((prevState) => ({
        ...prevState,
        name: _.get(props, "selectedUser.name", ""),
        email: _.get(props, "selectedUser.email", ""),
        password: _.get(props, "selectedUser.password", ""),
      }))
    } else {
      setDataUser((prevState) => ({
        ...prevState,
        name: "",
        email: "",
        password: "",
      }))
    }
  }, [props.selectedUser]) // eslint-disable-line

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">
        {_.isEmpty(props.selectedUser) ? "Add new user" : "Update user"}
      </DialogTitle>
      <DialogContent>

        <TextField
          id="name" label="Name" type="text"
          fullWidth name="name" variant="outlined" className="mb-1" value={dataUser.name}
          onChange={handleChange}
        />

        <TextField
          id="email" label="Email" type="email"
          fullWidth variant="outlined" name="email" className="mb-1" value={dataUser.email}
          onChange={handleChange}
        />
        {
          _.isEmpty(props.selectedUser) ?
            <TextField
              id="password" label="Password" type="password"
              fullWidth variant="outlined" name="password" className="mb-1" value={dataUser.password}
              onChange={handleChange}
            /> : ""
        }
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleModal(false)} color="primary">
          Cancel
          </Button>

        {
          _.isEmpty(props.selectedUser) ?
            <Button onClick={() => {
              props.toggleModal(false);
              createNewUser();
            }} color="primary">
              Create
          </Button> : <Button onClick={() => {
              props.toggleModal(false);
              updateNewUser();
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
    selectedUser: state.selectedUser,
    users: state.users,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(ModalUser));
