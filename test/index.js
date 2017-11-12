var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/');
var should = chai.should();

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
