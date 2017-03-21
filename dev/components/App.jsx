import React from 'react'
import styles from './App.scss'

import { NavLink } from 'react-router-dom';
import LoadedPlayer from "./../containers/LoadedPlayer.jsx"

const App = React.createClass({
  render: function() {
    return (
      <div className={styles.appWrapper}>
        <header>
          <h1>{this.props.title}</h1>
        </header>

        <nav>
          <ul>
            <li><NavLink to="/">Notepad</NavLink></li>
            <li><NavLink to="/player">Player</NavLink></li>
            <li><NavLink to="/distances">Distances</NavLink></li>
          </ul>
        </nav>
        <section className={styles.mainDisplay}>{this.props.children}</section>
        <LoadedPlayer />
      </div> )
    }
  });

  module.exports = App;
