import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";
import _ from "lodash";

import ModalGenre from "./ModalGenre";
import ModalMovie from "./ModalMovie";
import ModalCinema from "./ModalCinema";
import ModalRoom from './ModalRoom';
import ModalSchedule from './ModalSchedule';
import ModalUser from './ModalUser';

interface ModalProps {
  openModal: boolean,
  toggleModal: (value: boolean) => void,
}

const Modal = (props: ModalProps) => {

  const { pathname } = window.location;
  const type = _.last(pathname.split("/"));

  const renderContent = () => {
    switch (type) {
      case "genres":
        return <ModalGenre />

      case "movies":
        return <ModalMovie />

      case "cinemas":
        return <ModalCinema />

      case "rooms":
        return <ModalRoom />

      case "schedules":
        return <ModalSchedule />

      case "users":
        return <ModalUser />

      default:
        return "";
    }
  }

  return (
    <Dialog open={props.openModal} onClose={() => props.toggleModal(false)} aria-labelledby="form-dialog-title">
      {renderContent()}
    </Dialog>
  );
}

const mapStateToProps = (state: any) => {
  return {
    openModal: state.main.openModal,
  }
}

export default connect(mapStateToProps, { toggleModal })(Modal);