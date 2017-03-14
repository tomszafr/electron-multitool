const React = require('react');
const {dialog} = electronRequire('electron').remote;
const fs = require('fs');

import DisplayWindow from "./../DisplayWindow.jsx"

function openFile(cb) {
  let callback = cb
  dialog.showOpenDialog(function (fileNames) {
      // fileNames is an array that contains all the selected
     if(fileNames === undefined){
          console.log("No file selected");
     } else {
          readFile(fileNames[0], callback)
     }
  })
 }

 function readFile(filepath, cb){
     fs.readFile(filepath, 'utf-8', function (err, data) {
           if(err){
               alert("An error ocurred reading the file :" + err.message);
               return false;
           }
           // Change how to handle the file content
           console.log("The file content is : " + data);
           cb(data);
     });
 }

const FirstView = React.createClass({
  getInitialState: function() {
    if (this.props.state) {
      return this.props.state
    } else {
      return {
        content: ''
      }
    }
  },
  updateContent: function(data) {
    console.log('update with: ' + data)
    this.setState({
      content: data
    })
  },
  componentWillUnmount: function() {
    return this.props.saveState(this.state, 'FirstView')
  },
  render: function() {
    return (
      <div>
        <button onClick={() => {
            openFile(this.updateContent)
        }}>Load a file</button>
      <DisplayWindow editContent={this.updateContent} cssClass="viewDisplay">{this.state.content}</DisplayWindow>
      </div>
    )
  }
});

module.exports = FirstView;
