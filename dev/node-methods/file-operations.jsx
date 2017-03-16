const {dialog} = electronRequire('electron').remote;
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

function openFile(cb) {
  dialog.showOpenDialog(function (fileNames) {
      // fileNames is an array that contains all the selected
     if(fileNames === undefined){
     } else {
          readFile(fileNames[0], cb)
     }
  })
 }

 function readFile(filepath, callback){
     fs.readFile(filepath, 'utf-8', function (err, data) {
           if(err){
               showModal({type: 'error', message: 'An error ocurred reading the file :' + err.message})
               console.log(err);
               return false;
           }
           callback(data, filepath);
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
