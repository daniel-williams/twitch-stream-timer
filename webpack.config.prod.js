var path = require('path');
var webpack = require('webpack');

var webpackconfig = require('./webpack.config.js');
var config = webpackconfig.config;

config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
]);

// console.log('-----config-----');
// console.log(config);
// console.log('-----config-----');

module.exports = config;