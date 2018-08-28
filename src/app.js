import React, { Component } from "react";
import { Provider } from "react-redux";

import store from "./store";

import "./app.css";

import TicTacToe from "./views/ticTacToe";
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {/* <div className="app"> */}
        {/* <TodoList /> */}

        <TicTacToe />

        {/* </div> */}
      </Provider>
    );
  }
}

export default App;
