'use strict';

var _converter = require('./converter');

var _converter2 = _interopRequireDefault(_converter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (source) {
  this.cacheable();

  var callback = this.async();

  (0, _converter2.default)(source).then(function (result) {
    return callback(null, result);
  }).catch(function (err) {
    return callback(err);
  });
};