import {db} from '../connection';

const runner = (request, response) => {
  db.then((result) => result.query('SELECT "test" AS result')
    .then(([rows, fields]) => response.status(200).json({test: rows}))
    .catch((err) => resoponse.status(500).json({error: err})));
};

export default runner;
