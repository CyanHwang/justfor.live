var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('express-jwt'); 
// 引入密钥
require('dotenv').config();
// 跨域
var cors = require('cors');

// 用户
var adminsRouter = require('./routes/admin/users');
var tipsRouter = require('./routes/admin/tips');
var cataloguesRouter = require('./routes/admin/catalogues');
var articlesRouter = require('./routes/admin/articles');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 跨域
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//后台登录接口认证
app.use(jwt({'secret': process.env.SECRET}).unless({
  path: [
      '/admins/sign-in',
      '/admins/sign-up'
  ]
}));

// 接口
app.use('/admins',adminsRouter);
app.use('/tips',tipsRouter);
app.use('/catalogues',cataloguesRouter);
app.use('/articles',articlesRouter);

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
