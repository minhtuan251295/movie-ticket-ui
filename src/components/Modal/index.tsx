import React from 'react';
import Dialog from '@material-ui/core/Dialog';

import { connect } from "react-redux";
import { toggleModal } from "../../actions/main";
import _ from "lodash";

import ModalGenre from "./ModalGenre";


interface ModalProps {
  openModal: boolean,
  toggleModal: (value: boolean) => void,

}

const Modal = (props: ModalProps) => {

  const { pathname } = window.location;
  const type = _.last(pathname.split("/"));

  return (
    <Dialog open={props.openModal} onClose={() => props.toggleModal(false)} aria-labelledby="form-dialog-title">
      <ModalGenre />
    </Dialog>
  );
}

const mapStateToProps = (state: any) => {
  return {
    openModal: state.main.openModal,
  }
}

export default connect(mapStateToProps, { toggleModal })(Modal);