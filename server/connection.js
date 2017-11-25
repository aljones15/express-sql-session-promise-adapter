import mysqlPromise from 'mysql2/promise';


export let db = mysqlPromise.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'promise_test',
  password: 'promise_test',
  database: 'promise_test',
  connectTimeout: 600
});

/**
 * query - simply returns a promise
 * @param {String} text
 * @return {function}
*/
export const query = (text, values) => {
  return db.then((connection) => connection.query(text, values));
}
