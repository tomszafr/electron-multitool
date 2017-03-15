const React = require('react');
import {openFile, readFile, saveChanges} from './../../node-methods/file-operations.jsx'

const Notepad = React.createClass({
  handleChange: function() {
    this.props.onChangeText(this._textarea.value)
  },
  handleLoad: function(data, filepath) {
    let newFileContent = {
      text: data,
      filepath: filepath
    }
    this.props.onLoadFile(newFileContent)
    this._textarea.value = data;
  },
  componentDidMount: function() {
    if(this.props.fileContent.text) {
      this._textarea.value = this.props.fileContent.text
    }
  },
  render: function() {
    return (
      <div>
        <button onClick={() => {
            openFile(this.handleLoad)
        }}>Open</button>
        <button onClick={() => {
            saveChanges(this.props.fileContent.filepath, this.props.fileContent.text)
        }}>Save</button>
      <textarea className="viewDisplay" ref={(el) => this._textarea = el} onChange={this.handleChange}></textarea>
      </div>
    )
  }
});

module.exports = Notepad;
