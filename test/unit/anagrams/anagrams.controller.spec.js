describe('Anagrams Endpoints', () => {
  let request;
  const sandbox = sinon.sandbox;

  after(() => sandbox.restore());

  describe('/anagrams/read.json GET', () => {

    it('should return array of 2 anagrams for the param "read" without including param', (done) => {

      const expectedResponse = {
        anagrams: [
          'dear',
          'dare'
        ]
      }

      request = chai.request(baseURL)
      .get('/anagrams/read.json')
      .end((err, res) => {
        expect(err).to.equal(null);
        res.should.have.status(200);
        res.body.should.have.property('anagrams');
        res.body.should.deep.equal(expectedResponse);
        const arr = res.body.anagrams;
        arr.should.be.an('array');
        arr.should.have.lengthOf(2);
        done();
      });
    });


    it('should return array of 1 anagrams for the param "read" if limit query param', (done) => {
      request = chai.request(baseURL)
      .get('/anagrams/read.json?limit=1')
      .end((err, res) => {
        expect(err).to.equal(null);
        res.should.have.status(200);
        res.body.should.have.property('anagrams');
        const arr = res.body.anagrams;
        arr.should.be.an('array');
        arr.should.have.lengthOf(1);
        done();
      });
    });


  });

});