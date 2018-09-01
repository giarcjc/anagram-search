describe('basic route test', () => {
  let request;
  const sandbox = sinon.sandbox;

  after(() => sandbox.restore());

  describe('basic GET', () => {
    it('should GET ', (done) => {
      request = chai.request(baseUrl)
      .get('/')
      .end((err, res) => {
        expect(err).to.be(null);
        // expect(err.status).to.equal(404);
        res.should.have.status(200);
        done();
      });
    });


  });

});