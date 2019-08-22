var createError = require('http-errors');
var express = require('express');
var history = require('connect-history-api-fallback');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 跨域
var cors = require('cors');

// history 404问题
var app = express();
app.use(history());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 跨域
app.use(cors());

// 用户
var adminsRouter = require('./routes/admin/users');
var tipsRouter = require('./routes/admin/tips');
var cataloguesRouter = require('./routes/admin/catalogues');
var articlesRouter = require('./routes/admin/articles');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 前后台静态页面托管
app.use('/admin',express.static(path.join(__dirname, './admin')));
app.use('/',express.static(path.join(__dirname, './web')));

// 接口
app.use('/admin/api/admins',adminsRouter);
app.use('/admin/api/tips',tipsRouter);
app.use('/admin/api/catalogues',cataloguesRouter);
app.use('/admin/api/articles',articlesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
