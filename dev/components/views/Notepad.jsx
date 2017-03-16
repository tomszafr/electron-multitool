const React = require('react');
import {openFile, readFile, saveChanges, createFile} from './../../node-methods/file-operations.jsx'

const Notepad = React.createClass({
  handleChange: function() {
    this.props.onChangeText(this._textarea.value)
  },
  loadCallback: function(data, filepath) {
    let newFileContent = {
      text: data,
      filepath: filepath
    }
    this.props.onLoadFile(newFileContent)
    this._textarea.value = data;
  },
  handleNewFile: function() {
    if (this.props.fileContent.text != '' || this.props.fileContent.filepath != '') {
      if (confirm('Save first?')) {
        this.handleSave()
      } else {
        this.handleCloseFile()
        this._textarea.value = '';
        this._textarea.focus()
      }
    } else {
      this._textarea.focus()
    }
  },
  handleSave: function() {
    if (!this.props.fileContent.filepath) {
      createFile(this.props.fileContent.text, (filepath) => { return filepath })
    } else {
      saveChanges(this.props.fileContent.filepath, this.props.fileContent.text)
    }
  },
  handleCloseFile: function() {
    this.props.onCloseFile()
    this._textarea.value = '';
  },
  componentDidMount: function() {
    if(this.props.fileContent.text) {
      this._textarea.value = this.props.fileContent.text
    }
    this._textarea.focus()
  },
  render: function() {
    return (
      <div>
        <button onClick={this.handleNewFile}>New</button>
        <button onClick={() => {
            openFile(this.loadCallback)
        }}>Open</button>
        <button onClick={this.handleSave}>Save</button>
        <button onClick={this.handleCloseFile}>Close</button>
      <textarea className="viewDisplay" ref={(el) => this._textarea = el} onChange={this.handleChange}></textarea>
      </div>
    )
  }
});

module.exports = Notepad;
