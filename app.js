var express = require('express')
  , fs = require('fs')
  , Promise = require('bluebird')
  , _ = require('underscore')
  , moment = require('moment')
  , compress = require('compression')
  , logger = require('morgan')
  , cookieParser = require('cookie-parser')
  , bodyParser = require('body-parser')
  , session = require('express-session')
  , favicon = require('serve-favicon')
  , serveIndex = require('serve-index')
  , serveStatic = require('serve-static')
  , methodOverride = require('method-override')
  , vhost = require('vhost')
  , AuthController = require('./controllers/auth')
  , UserController = require('./controllers/user')
  , UploadController = require('./controllers/upload')
  , ArticleController = require('./controllers/article')
  , ArticleModel = require('./models/article')
  , db = require('./lib/db')
  , errors = require('./lib/errors')
  , ClientError = errors.ClientError
  , conf = require('./config')
  , app = express()
  , main = express()
  , staticDir = __dirname + '/public'
  , uploadsDir = __dirname + '/uploads'
  , mainLog = fs.createWriteStream('./log/main.log', {flags: 'a'})
  , staticLog = fs.createWriteStream('./log/static.log', {flags: 'a'})
  , dev = app.get('env') === 'development'
  , format = 'YYYY/MM/DD HH:mm:ss';

moment.lang('zh-cn');

var startedAt = moment().format(format);

var RedisStore = require('connect-redis')(session);

main.locals.DEV = dev;

main.enable('case sensitive routing');
main.set('views', __dirname + '/views');
main.set('view engine', 'jade');

main.use(compress());

// log
var logFormat = ':remote-addr - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[X-Forwarded-For]"';
if (dev) {
  logFormat = 'dev';
  Promise.longStackTraces();
  // main.locals.pretty = true;
}
main.use(logger({
  format: logFormat,
  stream: mainLog
}));

main.use(favicon(__dirname + '/public/favicon.ico'));

main.use(cookieParser(conf.cookie_secret));
main.use(session({
  key: 'ssid',
  store: new RedisStore({
    client: db,
    ttl: 21600 // 6小时
  }),
  secret: conf.cookie_secret
}));

main.use(bodyParser.json());
main.use(bodyParser.urlencoded());
main.use(methodOverride());

// user auth
main.use(UserController.auth);

// Hijax render
main.use(function(req, res, next){
  res.renderHijax = function(view){
    if (req.query.hijax) {
      res.render(view + '-raw', function(err, html){
        if (err) {
          throw err;
        }
        var data = _.pick(res.locals, ['title', 'nav', 'script', 'datum', 'error']);
        data.html = html;
        // data.originalUrl = req.originalUrl;
        res.set('Content-Type', 'application/json; charset=utf-8');
        res.send(data);
      });
    } else {
      res.render(view);
    }
  };
  next();
});

main.get('/', function(req, res, next){
  ArticleModel.list()
  .then(function(list){
    res.locals.title = '你好，世界，我是王沈伟';
    res.locals.script = 'index';
    res.locals.articleList = list;
    res.renderHijax('index');
  }).catch(next);
});

// 文章
main.use('/article', ArticleController.index);

// 文章评论
main.use('/comments', ArticleController.comments);

// 上传文件
main.use('/upload', UploadController.index);

// Feed
// main.use('/feed', ArticleController.feed);

// 文章标签
main.use('/tag', ArticleController.tag);

// 登录/验证
main.use('/auth', AuthController.index);
main.use('/signout', AuthController.signout);

main.get('/robots.txt', function(req, res){
  res.sendfile(__dirname + '/robots.txt', {
    maxAge: 8.64e7 // 1天
  });
});

main.get('/README', function(req, res){
  res.sendfile(__dirname + '/README.md');
});

main.get('/thanks', function(req, res){
  res.locals.title = 'Thanks to them' + conf.title_suffix;
  res.renderHijax('thanks');
});

main.get('/uptime', function(req, res){
  var usage = process.memoryUsage()
    , duration = moment.duration(process.uptime() * 1e3)
    , uptime = []
    , days = Math.floor(duration.asDays())
    , hours = duration.hours()
    , minutes = duration.minutes()
    , seconds = duration.seconds();
  if (days > 0) {
    uptime.push(days + 'd');
  }
  if (hours > 0 || days > 0) {
    uptime.push(hours + 'h');
  }
  if (minutes > 0 || hours > 0 || days > 0) {
    uptime.push(minutes + 'm');
  }
  uptime.push(seconds + 's');
  usage.startedAt = startedAt;
  usage.now = moment().format(format);
  usage.uptime = uptime.join(' ');
  res.send(usage);
});

// Google site verification
/*main.get('/google040d868833adfa0a.html', function(req, res){
  res.send('google-site-verification: google040d868833adfa0a.html');
});*/

// 404
main.use(function(req, res, next){
  next(new ClientError(404));
});

// Error handling
main.use(errors);

// 静态文件服务
var staticServer = express();
staticServer.enable('case sensitive routing');
staticServer.use(compress());
staticServer.use(logger({
  format: logFormat,
  stream: staticLog
}));

// @font-face access control
staticServer.use(function(req, res, next){
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', 'http://wangshenwei.com');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Max-Age', '2592000');
      return res.send(200);
    }
  }
  next();
});

var staticConf = {
  etag: false,
  maxAge: dev ? 0 : 2.592e9 // 30天
};

staticServer.use('/uploads', serveIndex(uploadsDir));
staticServer.use('/uploads', serveStatic(uploadsDir, staticConf));
staticServer.use(serveStatic(staticDir, staticConf));

var wwwServer = express();
wwwServer.all('*', function(req, res){
  res.redirect(301, 'http://wangshenwei.com' + req.originalUrl);
});

// app.enable('trust proxy');
app.use(vhost('wangshenwei.com', main));
app.use(vhost('weihub.com', staticServer));
app.use(vhost('www.wangshenwei.com', wwwServer));
app.use(vhost('127.0.0.1', wwwServer));

app.listen(conf.port, conf.host);
console.log('[%s] Express started listen on %s:%s, in %s mode',
    startedAt, conf.host, conf.port, app.get('env'));
