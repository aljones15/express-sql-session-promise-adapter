var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/');
var should = chai.should();
var expect = chai.expect;
import {query} from '../server/connection';

chai.use(chaiHttp);

it('Should get 200 for index', (done) => {
  const app = chai.request(server);
  app
    .get('/')
    .end((err, results) => {
      results.should.have.status(200);
      done();
    })
});

it('Should get 200 for regenerate', (done) => {
  const app = chai.request(server);
  app
    .get('/regenerate')
    .end((err, results) => {
      results.should.have.status(200);
      done();
    })
});

it('Should get 200 for destroy', (done) => {
  const app = chai.request(server);
  app
    .get('/destroy')
    .end((err, results) => {
      results.should.have.status(200);
      const sessionId = results.body.sessionId;
      const text = 'SELECT COUNT(*) AS count FROM ?? WHERE ?? = ?;';
      const values = ['sessions', 'session_id', sessionId];
      query(text, values)
        .then(([rows, fields]) => {
        expect(rows).to.have.lengthOf(1);
        const count = rows[0].count;
        expect(count).to.equal(0);
        done();
      }).catch((err) => {
        console.error(err)
        done();
      });
    })
});
