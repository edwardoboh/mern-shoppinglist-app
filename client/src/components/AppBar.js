import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Container,
} from "reactstrap";

import RegisterUser from "./RegisterUser";
import Logout from "./LogoutUser";
import Login from "./LoginUser";

class AppBar extends Component {
  state = {
    isOpen: false,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <Fragment>
        <NavItem>
          <Login />
        </NavItem>
        <NavItem>
          <RegisterUser />
        </NavItem>
      </Fragment>
    );

    const authLinks = (
      <Fragment>
        <NavbarText>
          {isAuthenticated ? <strong>Welcome, {user.name}</strong> : null}
        </NavbarText>
        <NavItem>
          <Logout />
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Shopping List</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : guestLinks}
              <NavItem>
                <Container>
                  <NavLink href="http://www.google.com" target="blank">
                    GitHub
                  </NavLink>
                </Container>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.Auth,
  };
};

export default connect(mapStateToProps, null)(AppBar);
// export default AppBar;
