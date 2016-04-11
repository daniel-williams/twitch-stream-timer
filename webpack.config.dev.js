var path = require('path');
var webpack = require('webpack');

var webpackconfig = require('./webpack.config.js');
var config = webpackconfig.config;

config.devtool = 'source-map';
config.debug = true;

config.entry.app = [
  path.join(webpackconfig.APP_ROOT, 'boot.ts')
];

config.output.publicPath = webpackconfig.DIST_PATH;

config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
]);

// console.log('-----config-----');
// console.log(config);
// console.log('-----config-----');

module.exports = config;
