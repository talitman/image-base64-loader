

const base64FileLoader = require("./base64_file_loader");
const base64UrlLoader = require("./base64_url_loader");
const { isFile } = require("./fileHandler");

const load=(fileOrPath, noBase64, defaultImage, defaultAsNoBase64) => {

    try {
        if (isFile(fileOrPath))
          return base64FileLoader
          .loadImageFormPath( fileOrPath,noBase64, defaultImage, defaultAsNoBase64);
        else 
          return base64UrlLoader
          .loadImage(fileOrPath, noBase64, defaultImage, defaultAsNoBase64)
    } catch (error) {
         return base64UrlLoader
        .loadImage(fileOrPath, noBase64, defaultImage, defaultAsNoBase64)
    }
 

}


const loadAsync = async (fileOrPath, noBase64, defaultImage, defaultAsNoBase64) => {
    try {
        if (isFile(fileOrPath)) {
            return await base64FileLoader
                        .loadImageFormPathAsync(fileOrPath, noBase64, defaultImage, defaultAsNoBase64)
        }else{
            return await base64UrlLoader
                 .loadImageAsync(fileOrPath, noBase64, defaultImage, defaultAsNoBase64)
        }   
            
    } catch (error) {
        return await base64UrlLoader
                 .loadImageAsync(fileOrPath, noBase64, defaultImage, defaultAsNoBase64)
    }
             
    
  }

module.exports={
    load:load,
    loadAsync:loadAsync
}
