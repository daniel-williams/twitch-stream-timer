var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');

var PROJECT_ROOT = path.resolve(__dirname);
var APP_ROOT = path.resolve(PROJECT_ROOT, 'src');
var WEB_ROOT = path.resolve(PROJECT_ROOT, 'client');
var DIST_PATH = '/content/bundles';


var config = {
  entry: {
    'app': path.join(APP_ROOT, 'boot.ts'),
    'vendors': path.join(APP_ROOT, 'vendors.ts')
  },
  output: {
    path: path.join(WEB_ROOT, DIST_PATH),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {test: /\.ts$/, loader: 'ts', exclude: [/node_modules/]},
      {test: /\.json$/, loader: "json"},
      {test: /\.html$/, loader: 'raw'},
      {test: /\.scss$/, loader: "raw!postcss!sass"}
    ],
    noParse: [/angular2\/bundles\/.+/],
  },
  postcss: function() { return [autoprefixer({browsers:['last 2 versions']})]; },
  resolve: {
    extensions: ['', '.ts', '.js', '.html', '.scss']
  },
  plugins: [],
};

module.exports = {
  PROJECT_ROOT: PROJECT_ROOT,
  APP_ROOT: APP_ROOT,
  WEB_ROOT: WEB_ROOT,
  DIST_PATH: DIST_PATH,
  config: config
};
