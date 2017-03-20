const React = require('react');

import { NavLink } from 'react-router-dom';
import LoadedPlayer from "./../containers/LoadedPlayer.jsx"

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
            <li><NavLink to="/player">Player</NavLink></li>
            <li><NavLink to="/distances">Distances</NavLink></li>
          </ul>
        </nav>
        <section className="mainDisplay">{this.props.children}</section>
        <LoadedPlayer ref={(player) => { this._player = player; }}> </LoadedPlayer>
      </div> )
    }
  });

  module.exports = App;
