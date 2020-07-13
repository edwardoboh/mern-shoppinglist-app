import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
  Input,
  NavLink,
  Label,
  Alert,
} from "reactstrap";
import { registerUser } from "../actions/AuthActions";
import { REGISTER_FAIL } from "../actions/Usertypes";
import { clearErrors } from "../actions/ErrorActions";
import Proptypes from "prop-types";

class RegisterUser extends Component {
  static propTypes = {
    isAuthenticated: Proptypes.bool,
    error: Proptypes.object.isRequired,
    registerUser: Proptypes.func.isRequired,
  };

  state = {
    name: null,
    email: null,
    password: null,
    msg: null,
    modal: false,
  };

  componentDidUpdate(preprop) {
    const { error, isAuthenticated } = this.props;
    if (error !== preprop.error) {
      if (error.id === REGISTER_FAIL) {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null });
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
    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password,
    };
    this.props.registerUser(newUser);
    this.setState({
      name: null,
      email: null,
      password: null,
    });
  };

  render() {
    return (
      <Container>
        <NavLink onClick={this.toggle} className="btn">
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.msg ? (
              <Alert color="danger">{this.state.msg}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmit}>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                // value={this.state.name}
                className="mb-3"
                onChange={this.onChange}
                placeholder="Full Name"
              />
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                // value={this.state.email}
                className="mb-3"
                onChange={this.onChange}
                placeholder="Email Address"
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                // value={this.state.password}
                className="mb-3"
                onChange={this.onChange}
                placeholder="Password"
              />
              <Button
                color="primary"
                block
                type="submit"
                style={{ margin: "0.5rem 0" }}
              >
                Register
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.Auth.isAuthenticated,
  error: state.Error,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  RegisterUser
);

// export default RegisterUser;
