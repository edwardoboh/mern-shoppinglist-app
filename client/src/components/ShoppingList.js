import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  ListGroup,
  ListGroupItem,
  Container,
  Button,
  Spinner,
} from "reactstrap";

import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/ItemActions";

import PropTypes from "prop-types";

class ShoppingList extends Component {
  // state = {
  //   items: [
  //     {
  //       _id: uuid(),
  //       name: "Apple",
  //     },
  //     {
  //       _id: uuid(),
  //       name: "Mango",
  //     },
  //     {
  //       _id: uuid(),
  //       name: "Pear",
  //     },
  //   ],
  // };

  deleteAnItem(_id) {
    this.props.deleteItem(_id);
  }

  componentDidMount() {
    this.props.getItems();
  }

  render() {
    // const { items } = this.state;
    const { items } = this.props.items;
    const { loading } = this.props.items;

    if (loading === true) {
      return (
        <Container>
          <Spinner
            style={{
              width: "12rem",
              height: "12rem",
              margin: "auto",
              display: "flex",
              flex: "1rf",
            }}
            color="primary"
            type="grow"
          />
        </Container>
      );
    }

    return (
      <Container>
        <ListGroup>
          {items.map(({ _id, name }) => (
            <ListGroupItem key={_id}>
              <Button
                color="danger"
                size="sm"
                style={{ marginRight: "0.5rem" }}
                onClick={this.deleteAnItem.bind(this, _id)}
              >
                &times;
              </Button>
              {name}
            </ListGroupItem>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

ShoppingList.propTypes = {
  items: PropTypes.object.isRequired,
  getItems: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    items: state.Items,
    // Here, we're mapping the name of the props, "items" to the name of the reducer in the store
  };
};

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);

// export default ShoppingList;
