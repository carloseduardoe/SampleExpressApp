'use strict';

const dotenv    = require('dotenv'),
      express   = require('express'),
      morgan    = require('morgan'),
      routesWeb = require('./src/routes-web'),
      routesApi = require('./src/routes-api');


dotenv.config();

const app = express();


// Setup request body JSON parsing.
app.use(express.json());

// Setup morgan which gives us HTTP request logging.
app.use(morgan('dev'));

// Set app port.
app.set('port', process.env.PORT || 8008);


// Different segments
app.use('/', routesWeb);
app.use('/api', routesApi);


// Standard 404
app.use((req, res) => {
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