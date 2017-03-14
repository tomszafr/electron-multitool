const {dialog} = electronRequire('electron').remote;
const fs = require('fs');

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

 function readFile(filepath, cb){
     fs.readFile(filepath, 'utf-8', function (err, data) {
           if(err){
               alert("An error ocurred reading the file :" + err.message);
               return false;
           }
           // Change how to handle the file content
           console.log("The file content is : " + data);
           cb(data, filepath);
     });
 }

 function saveChanges(filepath, content){
   console.log(filepath);
    fs.writeFile(filepath, content, function (err) {
        if(err){
            alert("An error ocurred updating the file"+ err.message);
            console.log(err);
            return;
        }

        alert("The file has been succesfully saved");
    });
}

module.exports = {openFile, readFile, saveChanges};
