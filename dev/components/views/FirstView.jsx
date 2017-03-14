const React = require('react');
import {openFile, readFile, saveChanges} from './../../node-methods/file-operations.jsx'

import DisplayWindow from "./../DisplayWindow.jsx"

const FirstView = React.createClass({
  getInitialState: function() {
    if (this.props.state) {
      return this.props.state
    } else {
      return {
        content: '',
        filepath: ''
      }
    }
  },
  updateContent: function(data, filepath) {
    this._textarea.value = data;
    this.setState({
      content: data,
      filepath: filepath
    })
  },
  handleChange: function(event) {
    this.setState({
      content: event.target.value
    });
  },
  componentDidMount: function() {
    if (this.state.content) {
      this._textarea.value = this.state.content;
    }
  },
  componentWillUnmount: function() {
    return this.props.saveState(this.state, 'FirstView')
  },
  render: function() {
    return (
      <div>
        <button onClick={() => {
            openFile(this.updateContent)
        }}>Open</button>
        <button onClick={() => {
            saveChanges(this.state.filepath, this.state.content)
        }}>Save</button>
      <textarea className="viewDisplay" ref={(el) => this._textarea = el} onChange={this.handleChange}></textarea>
      </div>
    )
  }
});

module.exports = FirstView;
