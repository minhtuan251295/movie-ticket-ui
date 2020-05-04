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

interface IModalGenreProps {
  genres: Array<ITF.Genre>,
  selectedGenre: ITF.Genre,
  toggleModal: (value: boolean) => void,
}

const ModalGenre: React.FunctionComponent<IModalGenreProps & ITFGeneralActions> = (props) => {

  const [dataGenre, setDataGenre] = React.useState({
    name: "",
    imageURL: "",
  } as ITF.Genre);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDataGenre((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const createNewGenre = () => {
    props.createData("genres", "genre", dataGenre);
  }

  const updateNewGenre = () => {
    props.updateData("genres", "genre", dataGenre, _.get(props, "selectedGenre.id", ""))
  }

  React.useEffect(() => {
    if (!_.isEmpty(props.selectedGenre)) {
      setDataGenre((prevState) => ({
        ...prevState,
        name: _.get(props, "selectedGenre.name", ""),
        imageURL: _.get(props, "selectedGenre.imageURL", ""),
      }))
    } else {
      setDataGenre((prevState) => ({
        ...prevState,
        name: "",
        imageURL: "",
      }))
    }
  }, [props.selectedGenre]) // eslint-disable-line

  return (
    <React.Fragment>
      <DialogTitle id="form-dialog-title">
        {_.isEmpty(props.selectedGenre) ? "Add new genre" : "Update genre"}
      </DialogTitle>
      <DialogContent>

        <TextField
          id="name" label="Name of genre" type="text"
          fullWidth name="name" variant="outlined" className="mb-1" value={dataGenre.name}
          onChange={handleChange}
        />

        <TextField
          id="imageURL" label="Image URL" type="text"
          fullWidth variant="outlined" name="imageURL" className="mb-1" value={dataGenre.imageURL}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.toggleModal(false)} color="primary">
          Cancel
          </Button>

        {
          _.isEmpty(props.selectedGenre) ?
            <Button onClick={() => {
              props.toggleModal(false);
              createNewGenre();
            }} color="primary">
              Create
          </Button> : <Button onClick={() => {
              props.toggleModal(false);
              updateNewGenre();
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
    selectedGenre: state.selectedGenre,
    genres: state.genres,
  }
}

export default connect(mapStateToProps, { toggleModal })(GeneralActions(ModalGenre));
