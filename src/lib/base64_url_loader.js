const requestSync = require("sync-request");
const axios = require("axios");
const { responseToBase64 } = require("./convert_to_bas64");
const { NO_URL } = require("./consts");

function loadImageFromUrl(url, noBase64, defaultImage, defaultAsNoBase64) {
  if (!url) return NO_URL;
  if (noBase64) return url;
  try {
    const response = requestSync("GET", url);
    if (response.statusCode === 200) {
      return responseToBase64(response.headers, response.getBody());
    }
    if (defaultImage) return loadImageFromUrl(defaultImage, defaultAsNoBase64);
    else return response.statusCode;
  } catch (error) {
    if (defaultImage) return loadImageFromUrl(defaultImage, defaultAsNoBase64);
    else return error;
  }
}
function loadImageFromUrlAsync(url, noBase64, defaultImage, defaultAsNoBase64) {
  return new Promise(function(reslove, reject) {
    if (!url) reject(NO_URL);
    if (noBase64) reslove(url);
    axios
      .get(url)
      .then(function(response) {
        if (response.status === 200) {
          reslove(responseToBase64(response.headers, response.data));
        }
        if (defaultImage)
          reslove(loadImageFromUrlAsync(defaultImage, defaultAsNoBase64));
        else reject(response.status);
      })
      .catch(err => {
        if (defaultImage)
          return reslove(loadImageFromUrlAsync(defaultImage, defaultAsNoBase64));
        else return reject(err);
      });
  });
}

// function loadAllImages(calls){
//   return axios.all(calls)
//     .then(axios.spread((...all) =>{

//     }))
  
// }

module.exports = {
  loadImageFromUrl: loadImageFromUrl,
  loadImageFromUrlAsync: loadImageFromUrlAsync,
  consts: [NO_URL]
};
