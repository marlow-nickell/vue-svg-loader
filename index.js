var svg = require('svgo');
var loaderUtils = require("loader-utils");

module.exports = function (content) {
  this.cacheable && this.cacheable(true);
  this.addDependency(this.resourcePath);

  var svgo = new svg({
    plugins: [
      'removeDoctype', 
      'removeComments',
      { 
        cleanupIDs: { 
          prefix: loaderUtils.interpolateName(this, '[name]', {content: content}),
        },
      },
    ],
  });

  var cb = this.async();

  svgo.optimize(content, function (result) {
    if (result.error) {
      return cb(result.error);
    }
    cb(null, "module.exports = {template: '" + result.data + "'};");
  });
};
