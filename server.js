
const base64ImageLoader = require("./src/index")
const express = require('express')
const app = express();
app.use(express.static('src/public'))
app.set('view engine', 'pug')
app.get("/",(req,res)=>{
 // var url ='https://blob-cluster1-rancher.s3.amazonaws.com/public/rainbow/Clinic/1/footer.svg'
  var image = 'imgs/1.jpeg'
    // fs.readFile(__dirname + "/src/public/index.html", function (err, html) {
    //     if (err) throw err;
    //     var url ='https://blob-cluster1-rancher.s3.amazonaws.com/public/rainbow/Clinic/1/footer.svg'
    //    // var img = `<img src=${loadImage(url)}>`;
    //     //html = html.toString().replace("{ img }", img);
    //     res.send(html);
    //   });
    // loadImageFormPathAsync(url).then(data=>{
    //   res.render(__dirname + "/src/public/index", { img: data })
    // }).catch(x=>{
    //   res.render(__dirname + "/src/public/index", { img: "" })
    // })
   
     res.render(__dirname + "/src/public/index", { imageLoader:base64ImageLoader,image:image  })
})
app.listen(3001)

