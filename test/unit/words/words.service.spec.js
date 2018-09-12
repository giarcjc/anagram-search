const {keyService} = require('../../../dist/db/key.service');
const {dbService} = require('../../../dist/db/db.service');
const {wordsService} = require('../../../dist/api/words/words.service');

describe('Words Service', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();

  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should add words from an array to the Data Store', async () => {
    const payload = [
      'read',
      'dare',
      'dear'
    ];
    const getKeyStub = sandbox.stub(keyService, 'getKey').returns('ader');
    const dbStub = sandbox.stub(dbService, 'addWordsToSet').resolves({});
    const word = 'read';
    await wordsService.addToDataStore(payload);
    getKeyStub.should.have.been.calledOnce.and.calledWith(word);
    dbStub.should.have.been.calledWith('ader', 'read');
    dbStub.should.have.been.calledWith('ader', 'dare');
    dbStub.should.have.been.calledWith('ader', 'dear');
  });

  it('should remove a single word from the Data Store', async () => {
    const getKeyStub = sandbox.stub(keyService, 'getKey').returns('ader');
    const dbStub = sandbox.stub(dbService, 'removeWordFromSet').resolves({});
    const word = 'read';
    await wordsService.removeFromDataStore(word);
    getKeyStub.should.have.been.calledOnce.and.calledWith(word);
    dbStub.should.have.been.calledOnce.and.calledWith('ader', word);
  });

  it('should remove all anagrams from the Data Store by key', async () => {
    const getKeyStub = sandbox.stub(keyService, 'getKey').returns('ader');
    const dbStub = sandbox.stub(dbService, 'removeSetByKey').resolves({});
    const word = 'read';
    const drop = 'all';
    await wordsService.removeFromDataStore(word, drop);
    getKeyStub.should.have.been.calledOnce.and.calledWith(word);
    dbStub.should.have.been.calledOnce.and.calledWith('ader');
  });


  it('should drop the entire Data Store', async () => {
    const dbStub = sandbox.stub(dbService, 'dropDataStore').resolves({});
    await wordsService.dropDataStore();
    dbStub.should.have.been.calledOnce;
  });


});