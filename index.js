var baseDir = __dirname;
var path = require('path');

module.exports.baseDir = __dirname;
module.exports.findSymbol = function(fn){
  var ext = path.extname(fn).slice(1);
  return path.join(__dirname,'assets', ext, fn)
};

