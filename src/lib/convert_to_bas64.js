

module.exports.responseToBase64 = (headers, body) =>
  `data:${headers["content-type"]};base64,${Buffer.from(body).toString("base64")}`;

module.exports.fileToBase64 = (image,mimeResult) => 
`data:${mimeResult.mime};base64,${new Buffer(image).toString("base64")}`;
