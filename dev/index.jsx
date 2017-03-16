import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux';

import createHashHistory from 'history/createHashHistory'

let history = createHashHistory()
console.log(history)

import App from "./components/App.jsx"
import theAppStore from "./reducers.jsx"

import LoadedNotepad from './containers/LoadedNotepad.jsx'
import SecondView from './components/views/SecondView.jsx'

let store = createStore(theAppStore)

// Stylesheets
require('./styles/style.scss');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App title="The App">
        <Route exact path="/" component={LoadedNotepad} />
        <Route path="/second" component={SecondView} />
      </App>
    </Router>
  </Provider>,
  document.querySelector("#container")
);
