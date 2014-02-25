
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var less = require('less');
var mongoose = require('mongoose');
var map = require('./maproutecontroller');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
mongoose.connect('mongodb://hoho:ghtjdWkdWkdaos@localhost:27017/underdogg');
//mongoose.connect('mongodb://ttwr:ghtjd0482@localhost:27017/underdogg');
mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose');
});


app.get('/', routes.index);
app.get('/fragment/:type/:name', routes.fragments);
app.get('*', routes.index);

var prefixes = ['dummies'];
prefixes.forEach(function(prefix) {
    //app.all("/"+prefix, preprocessor);
    map.mapRoute(app, prefix);
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
