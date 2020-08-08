'use strict';

const express = require('express'),
      path    = require('path'),
      cors    = require('cors'),
      morgan  = require('morgan'),
      routes  = require('./src/Routes');

require('dotenv').config();

const app = express();

// Enable all CORS Requests
app.use(cors());

// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));

// Support parsing of application/json and application/x-www-form-urlencoded post data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set app port.
app.set('port', process.env.PORT || 8008);

// Different routing segments
app.use('/api', routes);

// Standard 404
app.use((req, res) => {H9SCGRz2S_H2dq
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Global error handler.
app.use((err, req, res, next) => {
  console.error(`Global error handler: ${JSON.stringify(err.stack)}`);

  res.status(500).json({
    message: `Error: ${err.message}\nPath: ${req.originalUrl}`,
    error: process.env.NODE_ENV === 'production' ? {} : err
  });

  next();
});


// Start listening
const server = app.listen(app.get('port'), () => {
  console.log(`App listening on port ${server.address().port}`);
});