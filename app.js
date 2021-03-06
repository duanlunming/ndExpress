var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/news');

// 创建一个应用
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

// 是定视图模板yinqing
app.set('view engine', 'jade');
// 模板引擎
app.engine('jade', require('jade').__express);

/* 使用html为后缀的模板
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);
*/
/* 使用ejs为后缀的模板
var ejsObj = require('ejs');
ejsObj.open = '<{';
ejsObj.close = '}>';

app.set('view engine', 'ejs');
app.engine('ejs', ejsObj.renderFile);
*/
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/news',newsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
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
