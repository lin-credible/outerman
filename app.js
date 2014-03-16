var express = require('express')
  , fs = require('fs')
  , Promise = require('bluebird')
  , AuthController = require('./controllers/auth')
  , UserController = require('./controllers/user')
  , ArticleController = require('./controllers/article')
  , db = require('./lib/db')
  , errors = require('./lib/errors')
  , ClientError = errors.ClientError
  , conf = require('./config')
  , app = express()
  , main = express()
  , mainLog = fs.createWriteStream('./log/main.log', {flags: 'a'})
  , staticLog = fs.createWriteStream('./log/static.log', {flags: 'a'})
  , dev = app.get('env') === 'development';

var RedisStore = require('connect-redis')(express);

main.locals.DEV = dev;

main.enable('case sensitive routing');

// log
var logFormat = ':req[X-Real-IP] - - [:date] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":req[X-Forwarded-For]"';
if (dev) {
  logFormat = 'dev';
  Promise.longStackTraces();
  // main.locals.pretty = true;
}
main.use(express.logger({
  format: logFormat,
  stream: mainLog
}));

main.use(express.compress());

main.use(express.favicon(__dirname + '/public/favicon.ico'));

main.use(express.cookieParser(conf.cookie_secret));
main.use(express.session({
  key: 'ssid',
  store: new RedisStore({
    client: db,
    ttl: 21600 // 6小时
  }),
  secret: conf.cookie_secret
}));

// main.use(express.bodyParser());
main.use(express.json());
main.use(express.urlencoded());
// main.use(express.multipart());
main.use(express.methodOverride());
// user auth
main.use(UserController.auth);

main.set('views', __dirname + '/views');
main.set('view engine', 'jade');

main.get('/', function(req, res){
  res.render('index');
});

main.get('/robots.txt', function(req, res){
  res.sendfile(__dirname + '/public/robots.txt', {
    maxAge: 8.64e7 // 1天
  });
});

main.get('/README', function(req, res){
  res.sendfile(__dirname + '/README.md');
});

// 登录/验证
AuthController.use(main);

// 文章
ArticleController.use(main);

// Google site verification
main.get('/google040d868833adfa0a.html', function(req, res){
  res.send('google-site-verification: google040d868833adfa0a.html');
});

// 404
main.use(function(req, res, next){
  next(new ClientError(404));
});

// Error handling
main.use(errors);

// 静态文件服务
var staticServer = express();
staticServer.enable('case sensitive routing');
staticServer.use(express.logger({
  format: logFormat,
  stream: staticLog
}));
staticServer.use(express.compress());
// @font-face access control
staticServer.use(function(req, res, next){
  if (req.headers.origin) {
    res.header('Access-Control-Allow-Origin', 'http://weihub.com');
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      res.header('Access-Control-Allow-Max-Age', '2592000');
      return res.send(200);
    }
  }
  next();
});
staticServer.use(express.static(__dirname + '/public', {
  maxAge: 2.592e9 // 30天
}));

var wwwServer = express();
wwwServer.all('*', function(req, res){
  res.redirect(301, 'http://weihub.com' + req.originalUrl);
});

app.enable('trust proxy');
app.use(express.vhost('weihub.com', main));
app.use(express.vhost('c.weihub.com', staticServer));
app.use(express.vhost('www.weihub.com', wwwServer));

app.listen(conf.port, conf.host);
console.log('[%s] Express started listen on %s:%s, in %s mode',
  new Date().toUTCString(), conf.host, conf.port, app.get('env'));
