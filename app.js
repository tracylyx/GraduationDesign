var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);   /// 这两个模块实现将信息存储到mongodb

var routes = require('./routes/index');
var settings = require('./settings');
var flash = require('connect-flash');

var flash = require('connect-flash');    /// flash是存放在session里的，通过他我们可以方便地实现页面的通知和错误信息显示功能
var multer = require('multer');
var app = express();

/// all environments
// view engine setup
app.set('views', path.join(__dirname, 'views'));  /// 设置模板引擎  __dirname 全局变量存储当前正在执行的脚本所在的目录。
app.set('view engine', 'ejs');      // 真正指定使用哪个模板引擎的是通过这句设定                 /// 页面模板的存储位置
app.use(flash());       // 安装flash模块
app.use(multer({
    dest: './public/images',     /// dest是上传的文件所在的目录
    rename: function ( fieldname, filename ) {    /// rename函数用来修改上传后的文件名，这里设置保持原来的文件名
        return filename;
    }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));   /// 加载日志中间件
app.use(bodyParser.json());    /// 加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));    /// 加载解析unlencoded强求体的中间件
app.use(cookieParser());      /// cookie解析的中间件

app.use(session({                      /// express.session()提供会话支持
    secret: settings.cookieSecret,     /// 用来防止篡改cookie
    key: settings.db,                  /// key的值为cookie的名字
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 },   ///  30days  cookie的生存期
    store: new MongoStore({       /// 设置store参数为MongoStore实例，吧会话信息存储到数据库中，以避免丢失。这样可以通过req.session获取当前用户的会话对象，以维护用户相关的信息
        db: settings.db,
        host: settings.host,
        port: settings.port
    })
}));

app.use(express.static(path.join(__dirname, 'public')));   /// 设置了静态文件目录为public

routes(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
/// 开发环境下的错误处理器，将错误信息渲染erroe模板并显示到浏览器中
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

app.listen(3000, function() {
    console.log('port at 3000~~~');
});


module.exports = app;