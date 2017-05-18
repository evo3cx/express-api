const express = require('express');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const API = require('./app/controller/controller');
const app = express();

// configure app
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to mongodb
mongoose.connect('mongodb://localhost/test');
mongoose.Promise = require('bluebird');


app.get('/', (req, res) => {
  res.json({ message: 'Test Case API' });
});

app.use('/api', API);

/**
* Error handling
*/
app.use((req, res) => {
  res.status(404).json({ message: '404'});
});

module.exports = app;
