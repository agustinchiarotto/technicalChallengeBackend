const mongoose = require('mongoose');
const { environment, api_hostname, api_port, db_hostname, db_port } = require('./config');

mongoose.connect(`mongodb://${db_hostname}:${db_port}/kin`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection
  .once('open', () => {
    console.log('DB connected');
  })
  .on('error', console.error.bind(console, 'MongoDB connection error:'));
