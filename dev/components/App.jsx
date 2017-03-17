const React = require('react');

import { NavLink } from 'react-router-dom';
import Player from "./Player.jsx"

const App = React.createClass({
  render: function() {
    return (
      <div className="wrapper">
        <header>
          <h1>{this.props.title}</h1>
        </header>

        <nav>
          <ul className="header">
            <li><NavLink to="/">Notepad</NavLink></li>
            <li><NavLink to="/second">Else</NavLink></li>
          </ul>
        </nav>
        <section className="mainDisplay">{this.props.children}</section>
        <Player></Player>
      </div> )
    }
  });

  module.exports = App;
