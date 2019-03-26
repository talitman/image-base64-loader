const fs = require("fs");
const {ERROR,OK} = require('./consts');
function isFile(path) {
  return fs.statSync(path).isFile();
}

function readFileAsync(path) {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject({status:ERROR,err:err});
      } else {
        resolve({status:OK,data:data});
      }
    });
  });
}
function readFile(path) {
  try {
    return fs.readFileSync(path);
  } catch (err) {
    return err;
  }
}

module.exports={
    readFileAsync:readFileAsync,
    readFile:readFile,
    isFile:isFile
    
}
