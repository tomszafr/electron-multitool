const React = require('react');
import DisplayWindow from "./DisplayWindow.jsx"

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import FirstView from './views/FirstView.jsx'
import SecondView from './views/SecondView.jsx'

const App = React.createClass({
  getInitialState: function() {
    return {
      view: <FirstView saveState={this.saveViewState} />,
      FirstView: {},
      SecondView: {}
    }
  },
  saveViewState: function(state, view) {
    let stateToMerge ={}
    stateToMerge[view] = state
    this.setState(stateToMerge)
  },
  updateView: function(newViewComponent) {
    this.setState({
      view: newViewComponent
    })
  },
  render: function() {
    return (
      <div>
        <header>
          <h1>{this.props.title}</h1>
        </header>

        <nav>
          <button onClick = {
            () => this.updateView( <FirstView state={this.state.FirstView} saveState={this.saveViewState} /> )
          }> Notepad </button>
          <button onClick = {
            () => this.updateView( <SecondView state={this.state.SecondView} saveState={this.saveViewState} /> )
          }> SecondView </button>
        </nav>
        <section>
          <DisplayWindow cssClass="mainDisplay"> {this.state.view} </DisplayWindow >
        </section>

      </div> )
    }
  });

  module.exports = App;
