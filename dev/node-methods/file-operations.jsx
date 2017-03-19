const { dialog } = electronRequire('electron').remote;
const fs = require('fs');

// https://github.com/electron/electron/blob/master/docs/api/dialog.md#dialogshowmessageboxbrowserwindow-options-callback for available options
function showModal(options) {
  return dialog.showMessageBox(options)
}

function createFile(content, callback) {
  dialog.showSaveDialog(function (fileName) {
         if (fileName === undefined){
              return;
         }
         saveChanges(fileName, content)
         callback(fileName)
  });
}

function openFile(type, options, callback) {
  dialog.showOpenDialog(options, function (fileNames) {
    if(fileNames !== undefined){
      if (type === 'txt') {
        readFile(fileNames, callback)
      } else {
        callback(fileNames)
      }
    }
  })
 }

 function readFile(filepath, callback){
     fs.readFile(filepath[0], 'utf-8', function (err, data) {
           if(err){
               showModal({type: 'error', message: 'An error ocurred reading the file :' + err.message})
               console.log(err);
               return false;
           }
           callback(data, filepath[0]);
     });
 }

 function saveChanges(filepath, content, callback){
    fs.writeFile(filepath, content, function (err) {
        if(err){
            showModal({type: 'error', message: 'An error ocurred updating the file :' + err.message})
            console.log(err);
            return false;
        }
    });
}

module.exports = {showModal, openFile, createFile, readFile, saveChanges};
