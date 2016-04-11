var path = require('path');
var express = require('express');
var lrserver = require('tiny-lr')();
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

var webpackConfig = require('../webpack.config.dev.js');


var port = process.env.PORT || 3000;
var app = express();
var webpackCompiler = webpack(webpackConfig);

var lrPort = 35729;
var handleLiveReload = function() {
  lrserver.changed({
    body: {
      files: [webpackConfig.output.filename]
    }
  });
};

lrserver.listen(lrPort, handleLiveReload);

webpackCompiler.plugin('done', handleLiveReload);

// app.use(webpackDevMiddleware(webpackCompiler));
app.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
    }
}));

app.use(require('connect-livereload')({port: lrPort}));

app.use(favicon(path.resolve(__dirname + './../client/content/images/favicon.ico')));

app.use('/content', express.static('client/content'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.post('/api/*', function response(req, res) {
  console.log('url: ', req.url, ', json: ', req.body);
  res.status(200).end();
});

app.get('*', function response(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});


app.listen(port, '127.0.0.1', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://127.0.0.1:%s/ in your browser.', port, port);
});
