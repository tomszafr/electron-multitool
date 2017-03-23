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
import LocationDistances from './containers/LocationDistances.jsx'

let store = createStore(theAppStore)

// 'Global' styles'
require('./fonts/Airstream/Airstream.scss')
require('./fonts/RobotoCond/RobotoCondensed.scss')
require('./components/_style.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App title="Multitool">
        <Route exact path="/" component={LoadedNotepad} />
        <Route path="/player" component={LoadedPlayerTab} />
        <Route path="/distances" component={LocationDistances} />
      </App>
    </Router>
  </Provider>,
  document.querySelector("#container")
);
