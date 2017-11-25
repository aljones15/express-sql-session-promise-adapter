'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
* _query - makes the actual database calls
* @param (Object) connection - a promise based database connection
* @return {function}
* @param {string} query the actual query to perform
* @param {[string]} values - values that will be escaped and inserted in the query
* @param {function} cb - the callback
* @return {function}
*/
var _query = exports._query = function _query(connection) {
  return function (query, values, cb) {
    var funcType = _typeof(function () {});
    var callback = false;
    if (cb && (typeof cb === 'undefined' ? 'undefined' : _typeof(cb)) == funcType) {
      callback = cb;
    }
    if (!callback && values && (typeof values === 'undefined' ? 'undefined' : _typeof(values)) === funcType) {
      callback = values;
    }
    return connection.query(query, values).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          rows = _ref2[0],
          fields = _ref2[1];

      return callback(null, rows, fields);
    }).catch(function (err) {
      return callback(err, null, null);
    });
  };
};

/**
* adapter - the actual adapter takes in the promise 
* and outputs an object that can handle session data
* @param {Object} db - a promise
* @return {Object}
*/
var adapter = exports.adapter = function adapter(db) {
  // if the user already resolved the intitial connection then use it
  if (db.query) {
    return {
      query: function query(_query2, values, cb) {
        return _query(db)(_query2, values, cb);
      }
    };
  }
  // else make the initial connection and get started
  return {
    query: function query(_query3, values, cb) {
      return db.then(function (connection) {
        return _query(connection)(_query3, values, cb);
      });
    }
  };
};

exports.default = adapter;
