const { readFile, readFileAsync, isFile } = require("./fileHandler");
const { fileToBase64 } = require("./convert_to_bas64");
const { NO_FILE, OK } = require("./consts");
const readChunk = require('read-chunk');
const imageType  =require('image-type')
function loadFormPath(path, noBase64, defaultImage, defaultAsNoBase64) {
  if (!path) return NO_FILE;
  if (noBase64) return path;
  const file = isFile(path);
  if (file) {
    const image = readFile(path);

    return fileToBase64(image,toMimeResult(path));
  }
  if (defaultImage) loadFormPath(defaultImage, defaultAsNoBase64);
  else return file;
}


function loadFormPathAsync(path, noBase64, defaultImage, defaultAsNoBase64) {
  return new Promise((resolve, reject) => {
    if (!path) return NO_FILE;
    if (noBase64) return path;
    readFileAsync(path)
      .then(res => {
        if (res.status === OK) return resolve(fileToBase64(res.data,toMimeResult(path)));
        else reject(res.err);
      })
      .catch(err => {
        if (defaultImage)
          return resolve(loadFormPathAsync(defaultImage, defaultAsNoBase64));
        else return reject(err);
      });
  });
}

function toMimeResult(path){
    const buffer = readChunk.sync(path, 0, 12);
    return imageType(buffer);
}



module.exports = {
  loadImageFormPath: loadFormPath,
  loadImageFormPathAsync: loadFormPathAsync
};
