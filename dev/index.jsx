import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import App from "./components/App.jsx"

// Stylesheets
require('./styles/style.scss');

ReactDOM.render(
  <App title="The App"/>,
  document.querySelector("#container")
);
