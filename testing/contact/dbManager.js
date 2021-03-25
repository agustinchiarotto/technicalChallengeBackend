const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server-global');
const mongooseOpts = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
};

jest.setTimeout(60000);

const COLLECTIONS = [];

class DBManager {
  constructor() {
    this.db = null;
    this.server = new MongoMemoryServer();
    this.connection = null;
  }

  async start() {
    const url = await this.server.getUri();
    this.connection = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.db = this.connection.db(await this.server.getDbName());
    await mongoose.connect(url, mongooseOpts);
  }

  async stop() {
    this.connection.close();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    return this.server.stop();
  }
}

module.exports = DBManager;
