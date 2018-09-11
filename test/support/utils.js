const proxyquire = require('proxyquire');

const mockConnection = {
  dbService: {
    connectToRedis: () => Promise.resolve(),
  }
}

const mockStreamConnection = {
  importService: {
    streamToRedis: () => Promise.resolve(),
  }
}

const app = proxyquire('../../dist/app', {
  './db/db.service': mockConnection,
  './import': mockStreamConnection
});

function getMockedApp() {
  return app;
}

module.exports = {
  getMockedApp
}