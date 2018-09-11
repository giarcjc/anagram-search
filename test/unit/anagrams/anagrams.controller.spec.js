require('../../support/utils').getMockedApp();
const {anagramsService} = require('../../../dist/api/anagrams/anagrams.service');

describe('Anagrams Endpoints', () => {
  let request;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('/anagrams/read.json GET', () => {

    it('should return 200 for anagrams/:word.json endpoint', function(done) {
      const stub = sandbox.stub(anagramsService, 'getAnagrams').resolves({foo: 'bar'});
      request = chai.request(baseURL)
      .get('/anagrams/read.json')
      .end((err, res) => {
        expect(err).to.equal(null);
        res.should.have.status(200);
        stub.should.have.been.calledOnce.and.calledWith('read');
        done();
      });
    });

    it('should return 200 for anagrams/:word.json endpoint and pass query param', function(done) {
      const stub = sandbox.stub(anagramsService, 'getAnagrams').resolves({foo: 'bar'});
      request = chai.request(baseURL)
      .get('/anagrams/read.json?limit=1')
      .end((err, res) => {
        expect(err).to.equal(null);
        res.should.have.status(200);
        stub.should.have.been.calledOnce.and.calledWith('read', 1);
        done();
      });
    });

  });

});