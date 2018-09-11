const {anagramsService} = require('../../../dist/api/anagrams/anagrams.service');
const {keyService} = require('../../../dist/db/key.service');
const {dbService} = require('../../../dist/db/db.service');

describe('Anagrams Service', ()=> {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return all anagrams except provided word', async () => {
    const expectedResult = {
      'anagrams':
        [
          "dear",
          "dare"
        ]
    };

    const getKeyStub = sandbox.stub(keyService, 'getKey').returns('ader');
    const dbStub = sandbox.stub(dbService, 'listWordsByKey').resolves(Promise.resolve([ 'dear', 'dare', 'read' ]));
    const word = 'read';
    const result = await anagramsService.getAnagrams(word);
    getKeyStub.should.have.been.calledOnce.and.calledWith('read');
    dbStub.should.have.been.calledOnce.and.calledWith('ader');
    result.should.have.property('anagrams');
    result.should.deep.equal(expectedResult);
    let anagramArray = result.anagrams;
    anagramArray.should.not.include(word);
    const arr = result.anagrams;
    arr.should.be.an('array');
    arr.should.have.lengthOf(2);
  });

  it('should respect limit param', async () => {
    const getKeyStub = sandbox.stub(keyService, 'getKey').returns('ader');
    const dbStub = sandbox.stub(dbService, 'listWordsByKey').resolves(Promise.resolve([ 'dear', 'dare', 'read' ]));
    const word = 'read';
    const result = await anagramsService.getAnagrams(word, 1);
    getKeyStub.should.have.been.calledOnce.and.calledWith('read');
    dbStub.should.have.been.calledOnce.and.calledWith('ader');
    result.should.have.property('anagrams');
    const arr = result.anagrams;
    arr.should.be.an('array');
    arr.should.have.lengthOf(1);
  });
})