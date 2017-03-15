import React from "react";
import ReactDOM from "react-dom";
import { hashHistory } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import App from "./components/App.jsx"
import theAppStore from "./reducers.jsx"

import LoadedNotepad from './containers/LoadedNotepad.jsx'
import SecondView from './components/views/SecondView.jsx'

let store = createStore(theAppStore)

// Stylesheets
require('./styles/style.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <App title="The App">
        <Route exact path="/" component={LoadedNotepad} />
        <Route path="/second" component={SecondView} />
      </App>
    </Router>
  </Provider>,
  document.querySelector("#container")
);
