const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const contactRoutes = require('./src/routes/contact');
require('./database');
const { environment, api_hostname, api_port } = require('./config');

/**
 * Challenge Backend Developer - Kin+Carta
 * Agustin Chiarotto
 */

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/contact', contactRoutes);
app.use(express.json());

app.use(express.static(__dirname + '/public')).use(cors());

app.listen(api_port || 3000, api_hostname, () => {
  console.log(`Server running in ${environment} mode at http://${api_hostname}:${api_port}/`);
  console.log('Listening on ', api_port || 3000);
});
