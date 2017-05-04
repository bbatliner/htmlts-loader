'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minimize = require('minimize');

var _minimize2 = _interopRequireDefault(_minimize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var parse = function parse(match) {
  return new Promise(function (resolve, reject) {
    var minimize = new _minimize2.default();
    minimize.parse(match[0].slice(6, -2), function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(_defineProperty({}, match.index, '`' + data + '`'));
      }
    });
  });
};

exports.default = function (source) {
  var re = /`html\r?\n[\s\S]*?\r?\n[\s]*?`/g;
  var matches = [];
  var found = void 0;

  while (found = re.exec(source)) {
    matches.push(found);
  }

  if (matches.length === 0) {
    return Promise.resolve(source);
  }

  return Promise.all(matches.map(function (match) {
    return parse(match);
  })).then(function (results) {
    return Object.assign.apply(Object, [{}].concat(_toConsumableArray(results)));
  }).then(function (dict) {
    return source.replace(re, function (x, offset) {
      return dict[offset];
    });
  });
};