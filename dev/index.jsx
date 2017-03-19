import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import createHashHistory from 'history/createHashHistory'

let history = createHashHistory()

import App from "./components/App.jsx"
import theAppStore from "./reducers.jsx"

import LoadedNotepad from './containers/LoadedNotepad.jsx'
import LoadedPlayerTab from './containers/LoadedPlayerTab.jsx'

let store = createStore(theAppStore)

// Stylesheets
require('./styles/style.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App title="Multitool">
        <Route exact path="/" component={LoadedNotepad} />
        <Route path="/player" component={LoadedPlayerTab} />
      </App>
    </Router>
  </Provider>,
  document.querySelector("#container")
);
