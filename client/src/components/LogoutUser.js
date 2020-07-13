import React, { Component, Fragment } from "react";
import {
  Container,
  NavLink,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../actions/AuthActions";

import Proptypes from "prop-types";

class Logout extends Component {
  static propTypes = {
    logout: Proptypes.func.isRequired,
  };

  state = {
    modal: false,
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  logOut = () => {
    this.props.logout();
    this.toggle();
  };
  render() {
    return (
      <Fragment>
        <Container>
          <NavLink className="btn" onClick={this.toggle}>
            Logout
          </NavLink>
          <Modal toggle={this.toggle} isOpen={this.state.modal}>
            <ModalHeader toggle={this.toggle}>
              Logout From Shopping List?
            </ModalHeader>
            <ModalBody>
              <Button
                color="success"
                className="mb-3"
                onClick={this.logOut}
                block
              >
                Yes
              </Button>
              <Button
                color="danger"
                className="mb-3"
                onClick={this.toggle}
                block
              >
                Cancel
              </Button>
            </ModalBody>
          </Modal>
        </Container>
      </Fragment>
    );
  }
}
export default connect(null, { logout })(Logout);
