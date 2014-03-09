// Errors

var util = require('util')
  , text = {
    400: 'Bad Request',
    403: 'Forbidden',
    404: 'Not Found',
    409: 'Conflict'
  };

function errors(err, req, res, next) {
  if (! (err instanceof Error)) {
    console.log(err);
    err = new ClientError(404);
  }
  var code = err.code || 500
    , page = code >= 500 ? '5xx' : '4xx';
  res.status(code);
  res.render('error/' + page, {error: err});
}

// Request Error
function RequestError(code) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = 'Request failed: ' + code;
  this.code = 500;
}
util.inherits(RequestError, Error);

// Client Error
function ClientError(code) {
  Error.call(this);
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = text[code] || 'Unknown';
  this.code = code;
}
util.inherits(ClientError, Error);

errors.RequestError = RequestError;
errors.ClientError = ClientError;

module.exports = errors;