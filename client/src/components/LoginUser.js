import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Button,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  NavLink,
  Container,
  Alert,
} from "reactstrap";

import { LOGIN_FAIL } from "../actions/Usertypes";
import { login } from "../actions/AuthActions";
import { clearErrors } from "../actions/ErrorActions";
import Proptypes from "prop-types";

class LoginUser extends Component {
  static propTypes = {
    isAuthenticated: Proptypes.bool,
    error: Proptypes.object.isRequired,
    login: Proptypes.func.isRequired,
    clearErrors: Proptypes.func.isRequired,
  };
  state = {
    email: null,
    password: null,
    modal: false,
    msg: null,
  };

  componentDidUpdate(prevprops) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevprops.error) {
      if (error.id === LOGIN_FAIL) {
        this.setState({
          msg: error.msg.msg,
        });
      } else {
        this.setState({
          msg: null,
        });
      }
    }
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    this.props.clearErrors();
    this.setState({ modal: !this.state.modal });
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const user = {
      email,
      password,
    };
    this.props.login(user);
    this.setState({
      email: null,
      password: null,
      modal: this.state.modal,
      msg: null,
    });
  };

  render() {
    return (
      <Container>
        <NavLink className="btn" onClick={this.toggle}>
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>LogIn</ModalHeader>
          <ModalBody>
            {this.state.msg !== null ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                className="mb-3"
                onChange={this.onChange}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="mb-3"
                onChange={this.onChange}
              />
              <Button color="primary" type="submit" block>
                LogIn
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated,
    error: state.Error,
  };
};
export default connect(mapStateToProps, { login, clearErrors })(LoginUser);

// export default LoginUser;
