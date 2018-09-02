describe('Words Enpoints', () => {
  let request;
  const sandbox = sinon.sandbox;

  after(() => sandbox.restore());

  describe('/words.json POST', () => {

    it('should accept JSON with words array and return 201 status', (done) => {

      const payload = { 'words': ['read', 'dear', 'dare'] };

      request = chai.request(baseURL)
      .post('/words')
      .send(payload)
      .end((err, res) => {
        expect(err).to.equal(null);
        res.should.have.status(201);
        done();
      });
    });

    it('should NOT accept JSON with multiple properties', (done) => {

      const payload = {
        'words': ['read', 'dear', 'dare'],
        'morewords': ['read', 'dear', 'dare']
      };

      request = chai.request(baseURL)
      .post('/words')
      .send(payload)
      .end((err, res) => {
        expect(err.status).to.equal(500);
        done();
      });
    });

    it('should NOT accept JSON missing the "words" property', (done) => {

      const payload = {
        'foo': ['read', 'dear', 'dare']
      };

      request = chai.request(baseURL)
      .post('/words')
      .send(payload)
      .end((err, res) => {
        expect(err.status).to.equal(500);
        done();
      });
    });

    it('should NOT accept empty paylod', (done) => {

      const payload = {};

      request = chai.request(baseURL)
      .post('/words')
      .send(payload)
      .end((err, res) => {
        expect(err.status).to.equal(500);
        done();
      });
    });


  });

});