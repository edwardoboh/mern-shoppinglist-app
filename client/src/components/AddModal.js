import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Container,
} from "reactstrap";
import Input from "reactstrap/lib/Input";
import { addItem } from "../actions/ItemActions";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { v4 as uuid } from "uuid";

class AddModal extends Component {
  state = {
    modal: false,
    newInput: "",
  };

  // changeInput = (e) => {
  //   this.setState({ newInput: e.target.value });
  // };

  addAnItem(e) {
    e.preventDefault();
    const newItem = {
      _id: uuid(),
      name: this.state.newInput,
    };
    this.props.addItem(newItem);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <Container>
        <Button
          color="secondary"
          onClick={this.toggle}
          style={{ margin: "1rem 0.5rem" }}
        >
          Add Item
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Item To List</ModalHeader>
          <Form onSubmit={this.addAnItem.bind(this)}>
            <ModalBody>
              <Input
                type="text"
                name="item"
                onChange={(e) => {
                  this.setState({ newInput: e.target.value });
                }}
                // onChange={this.changeInput.bind(this)}
                placeholder="Enter name of Item"
              />
              <Button
                color="primary"
                type="submit"
                onClick={this.toggle}
                style={{
                  margin: "0.5rem 0",
                }}
                block
              >
                Add
              </Button>
            </ModalBody>
          </Form>
        </Modal>
      </Container>
    );
  }
}

AddModal.propTypes = {
  item: PropTypes.object.isRequired,
  addItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.Items,
});

export default connect(mapStateToProps, { addItem })(AddModal);
