const {dialog} = electronRequire('electron').remote;
const fs = require('fs');

function createFile(content, callback) {
  dialog.showSaveDialog(function (fileName) {
         if (fileName === undefined){
              console.log("You didn't save the file");
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
          console.log("No file selected");
     } else {
          readFile(fileNames[0], cb)
     }
  })
 }

 function readFile(filepath, callback){
     fs.readFile(filepath, 'utf-8', function (err, data) {
           if(err){
               alert("An error ocurred reading the file :" + err.message);
               return false;
           }
           callback(data, filepath);
     });
 }

 function saveChanges(filepath, content, callback){
    fs.writeFile(filepath, content, function (err) {
        if(err){
            alert("An error ocurred updating the file"+ err.message);
            console.log(err);
            return;
        }

        alert("The file has been succesfully saved");
    });
}

module.exports = {openFile, createFile, readFile, saveChanges};
