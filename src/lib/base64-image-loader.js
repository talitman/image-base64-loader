const { loadImageFromUrl, loadImageFromUrlAsync } = require("./base64_url_loader");
const { loadImageFormPath,loadImageFormPathAsync} = require("./base64_file_loader");


  class Base64ImageLoader{

    constructor(options){
        this.config={
            fromPath: false,
            async:false,
        }
        if(options) this.config=options
    }
    loadImage(urlOrPath,options){
        const {disableBase64,async,fromPath,defaultImage, defaultAsNoBase64}= options? options:this.config;
        const params =[urlOrPath,disableBase64,defaultImage,defaultAsNoBase64];
        if(fromPath) {
              if (async) return loadImageFormPathAsync(...params)
              else       return loadImageFormPath(...params)
        } 
        else{
            if (async) return loadImageFromUrlAsync(...params)
            else       return loadImageFromUrl(...params)
        }
    }
    // loadAll(urlOrPath,options){
    //     const {disableBase64,async,fromPath,defaultImage, defaultAsNoBase64}= options? options:this.config;
    //     const params =[urlOrPath,disableBase64,defaultImage,defaultAsNoBase64];
    // }

    // loadFromUrl(url,...options){
    //    // if(options.async) 
    // }
    // loadFromPath(url,...options){

    // }

}

const bil=new Base64ImageLoader();

bil.Base64ImageLoader=Base64ImageLoader;
module.exports=bil
