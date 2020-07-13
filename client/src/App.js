import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";

import ShoppingList from "./components/ShoppingList";
import AppBar from "./components/AppBar";
import AddModal from "./components/AddModal";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/AuthActions";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header> */}
        <Provider store={store}>
          <AppBar />
          <AddModal />
          <ShoppingList />
        </Provider>
      </div>
    );
  }
}

export default App;
