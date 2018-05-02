# express-sql-session-promise-adapter
** note this is no longer necessary sql session now supports promises

default: promiseAdapter
let's you use mysql2 promises with express-mysql-session

```
import promiseAdapter from 'express-session-mysql2-promise-adapter';
import express from 'express';
import session from 'express-session';
import SQLSession from 'express-mysql-session';
import mysqlPromise from 'mysql2/promise';


export let db = mysqlPromise.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: process.env.SESSION_DB_USER,
  password: process.env.SESSION_DB_PASSWORD,
  database: process.env.SESSION_DB,
  connectTimeout: 600
});

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
```
