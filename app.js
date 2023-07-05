var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// const UserRouter = require('./routes/admin/UserRouter');
const UserRouter = require('./routes/admin/UserRouter');// [后台管理系统]用户相关接口

const test1 = require("./routes/test1");
const JWT = require('./utils/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req,res,next)=>{
  //如果token有效，next()
  //token过期，返回401错误
  if(req.url === "/adminapi/user/login"){
    next()
    return
  }
  const token = req.headers["authorization"].split("")[1]
  if(token){
    //如果有token则进行token校验
    let payload = JWT.verify(token)
    if(payload){
      const newToken = JWT.generate({
        _id:payload._id,
        username:payload.username
      },'10s')
      res.header("Authorization",newToken)
      next()
    }else{
      res.status(401).send({errCode:"-1",errorInfo:"token过期"})
    }
    
  }
})
app.use(UserRouter)

// app.use(test1)
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

/*
  /adminapi/* -后台系统用的
  /webapi/*   -企业官网用的
*/

module.exports = app;
