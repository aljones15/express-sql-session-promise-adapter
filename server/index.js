import express from 'express';
import session from 'express-session';
import SQLSession from 'express-mysql-session';
import {db} from './connection';
import routes from './routes';
import promiseAdapter from '../index.js';

console.log(promiseAdapter);

const port = 8085;
const SQLStore = SQLSession(session);
const sessionStore = new SQLStore({}, promiseAdapter(db));
const localSession = {
  store: sessionStore,
  secret: 'test_secret',
  resave: true,
  rolling: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 99999,
    httpOnly: false
  }
};

const app = express();
app.use(session(localSession));
app.use('/', routes);
const server = app.listen(port, () => console.log(port));
function stop() {
  console.log('stopping server');
  server.close();
}
module.exports = server;
module.exports.stop = stop;
