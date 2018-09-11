const {wordsService} = require('../../../dist/api/words/words.service');

describe('Words Enpoints', () => {
  let request;
  let sandbox;

  before(() => {
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore()
  });

  describe('/words.json POST', () => {

    it('should accept JSON with words array and return 201 status', (done) => {
      const payload = { 'words': ['read', 'dear', 'dare'] };
      const stub = sandbox.stub(wordsService, 'addToDataStore').resolves({});
      request = chai.request(baseURL)
        .post('/words')
        .send(payload)
        .end((err, res) => {
          expect(err).to.equal(null);
          res.should.have.status(201);
          stub.should.have.been.calledWith(payload.words);
          done();
        });
    });

    it('should NOT accept JSON with multiple properties', (done) => {
      const payload = {
        'words': ['read', 'dear', 'dare'],
        'morewords': ['read', 'dear', 'dare']
      };

      const stub = sandbox.stub(wordsService, 'addToDataStore').resolves({});
      request = chai.request(baseURL)
        .post('/words')
        .send(payload)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(400);
          stub.should.not.have.been.called;
          done();
        });
    });

    it('should NOT accept JSON missing the "words" property', (done) => {
      const payload = {
        'foo': ['read', 'dear', 'dare']
      };

      const stub = sandbox.stub(wordsService, 'addToDataStore').resolves({});
      request = chai.request(baseURL)
        .post('/words')
        .send(payload)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(400);
          stub.should.not.have.been.called;
          done();
        });
    });

    it('should NOT accept empty paylod', (done) => {
      const payload = {};

      const stub = sandbox.stub(wordsService, 'addToDataStore').resolves({});
      request = chai.request(baseURL)
        .post('/words')
        .send(payload)
        .end((err, res) => {
          expect(err).to.equal(null);
          expect(res.statusCode).to.equal(400);
          stub.should.not.have.been.called;
          done();
        });
    });

  });

  describe('/words/read.json DELETE', () => {
    it('should return 204 for delete endpoint with param', (done) => {
      const stub = sandbox.stub(wordsService, 'removeWordFromDataStore').resolves({});
      request = chai.request(baseURL)
        .delete('/words/read.json')
        .end((err, res) => {
          expect(err).to.equal(null);
          res.should.have.status(204);
          stub.should.have.been.calledWith('read');
          done();
      });
    });
  });


  describe('/words.json DELETE', () => {
    it('should return 204 for delete endpoint with no param', (done) => {
      const stub = sandbox.stub(wordsService, 'dropDataStore').resolves({});
      request = chai.request(baseURL)
        .delete('/words')
        .end((err, res) => {
          expect(err).to.equal(null);
          res.should.have.status(204);
          stub.should.have.been.calledOnce;
          done();
      });
    })
  });

});