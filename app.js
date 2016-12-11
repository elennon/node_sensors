var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var readings = require('./routes/readings');
var bmp180 = require('./routes/bmp180');
var sht15 = require('./routes/sht15');
var sdp610 = require('./routes/sdp610');
var mlx906 = require('./routes/mlx906');
var cavityTemp = require('./routes/cavityTemp');
var hflux = require('./routes/hflux');
var sensor = require('./routes/sensor');
var weatherStation = require('./routes/weatherStation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/bmp180', bmp180);
app.use('/api/sht15', sht15);
app.use('/api/sdp610', sdp610);
app.use('/api/mlx906', mlx906);
app.use('/api/cavityTemp', cavityTemp);
app.use('/api/sensor', sensor);
app.use('/api/hflux', hflux);
app.use('/api/weatherStation', weatherStation);


app.use('/reading', readings);
app.use('/download', readings);
app.use('/downloads', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers



// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
