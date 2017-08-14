'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var config = require('./config/main');
var colors = require('colors');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

mongoose.connect(config.DATA_BASE,{
  useMongoClient: true
});

var index = require('./routes/index');
var users = require('./routes/users');
var angular = require('./routes/angular');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(methodOverride('_method'));

app.use('/client', express.static(__dirname+'/client'));

app.use('/js', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/'));
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts/'));

app.use('/', index);
app.use('/api', users);
app.use('/',angular);

http.listen(config.PORT, ()=>{
  console.log('info'.yellow + ' [Stack MEAN] '.magenta + 'serving app on localhost:'+config.PORT)
});
