/**
* _query - makes the actual database calls
* @param (Object) connection - a promise based database connection
* @return {function}
* @param {string} query the actual query to perform
* @param {[string]} values - values that will be escaped and inserted in the query
* @param {function} cb - the callback
* @return {function}
*/
export const _query = (connection) => (query, values, cb) => {
  console.log('query');
  console.log(query);
  console.log('values');
  console.log(values);
  console.log('cb');
  console.log(cb);
  const funcType = typeof(function() {});
  let callback = false;
  if (cb && typeof(cb) == funcType) {
        callback = cb;
  }
  if (!callback && values && typeof(values) === funcType) {
    callback = values;
  }
  return connection.query(query, values)
    .then(([rows, fields]) => callback(null, rows, fields))
    .catch((err) => callback(err, null, null));
};

/**
* adapter - the actual adapter takes in the promise 
* and outputs an object that can handle session data
* @param {Object} db - a promise
* @return {Object}
*/
export const adapter = (db) => {
  // if the user already resolved the intitial connection then use it
  if(db.query) {
    return {
      query: (query, values, cb) => _query(db)(query, values, cb)
    }
  }
  // else make the initial connection and get started
  return {
    query: (query, values, cb) => {
      return db.then((connection) => _query(connection)(query, values, cb))
    }
  }
};

export default adapter;
