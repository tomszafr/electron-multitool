const React = require('react');
import {showModal, openFile, readFile, saveChanges, createFile} from './../node-methods/file-operations.jsx'

const Notepad = React.createClass({
  // Calls the dispatch method with the current state of the textarea
  handleChange: function() {
    this.props.onChangeText(this._textarea.value)
  },
  // Ask user to confirm whether he wants to save, returns false when they click Cancel
  confirmSave: function() {
    let modalOptions = {
      type: 'question',
      title: 'Save?',
      message: 'Save before continuing?',
      buttons: ['Yes', 'No', 'Cancel']
    }
    switch (showModal(modalOptions)) {
      case 0:
        this.handleSave()
        return true
      case 1:
        return true
      case 2:
        return false
    }
  },
  // 'Save' handler
  // If fileContent.filepath is empty a new file needs to be created, use regular save otherwise
  handleSave: function() {
    if (!this.props.fileContent.filepath) {
      createFile(this.props.fileContent.text, (filepath) => { return filepath })
    } else {
      saveChanges(this.props.fileContent.filepath, this.props.fileContent.text)
    }
  },
  // 'Close' and 'New' handler
  // Asks for Save confirmation if the textarea isn't clear or a file was previously loaded
  // Clear the textarea and redux store data afterwards
  handleCloseAndNewFile: function() {
    if ((this.props.fileContent.text) || (this.props.fileContent.filepath)) {
      if (!this.confirmSave()) {
        return
      }
    }
    this.props.onCloseFile()
    this._textarea.value = '';
    this._textarea.focus()
  },
  handleOpen: function() {
    let openOptions = {
      filters: [
        {name: 'Text Files', extensions: ['txt']}
      ]
    }
    if ((this.props.fileContent.text) || (this.props.fileContent.filepath)) {
      if (!this.confirmSave()) {
        return
      }
    }
    openFile('txt', openOptions, this.loadCallback)
  },
  // Callback for opening new files, used to dispatch its data and filepath to the redux store
  loadCallback: function(data, filepath) {
    let newFileContent = {
      text: data,
      filepath: filepath
    }
    this.props.onLoadFile(newFileContent)
    this._textarea.value = data; // Load the data from the file into the textarea
  },
  componentDidMount: function() {
    // Populate the textarea with data from redux store, mainly used on tab switch (component gets unmounted)
    if(this.props.fileContent.text) {
      this._textarea.value = this.props.fileContent.text
    }
    this._textarea.focus()
  },
  render: function() {
    return (
      <div className="notepadContainer">
        <span>{this.props.fileContent.filepath}</span>
        <div className="buttonContainer">
          <button onClick={this.handleCloseAndNewFile}>New</button>
          <button onClick={this.handleOpen}>Open</button>
          <button onClick={this.handleSave}>Save</button>
          <button onClick={this.handleCloseAndNewFile}>Close</button>
        </div>
      <textarea className="viewDisplay" ref={(el) => this._textarea = el} onChange={this.handleChange}></textarea>
      </div>
    )
  }
});

module.exports = Notepad;
