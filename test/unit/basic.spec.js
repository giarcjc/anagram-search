describe('basic route test', () => {
  let request;
  const sandbox = sinon.sandbox;

  after(() => sandbox.restore());

  describe('basic GET', () => {
    it('should GET ', (done) => {
      request = chai.request('http://localhost:3000')
      .get('/')
      .end((err, res) => {
        expect(err).to.equal(null);
        res.should.have.status(200);
        done();
      });
    });


  });

});