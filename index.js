'use strict';

const express  = require('express'),
      path     = require('path'),
      cors     = require('cors'),
      morgan   = require('morgan'),
      mongoose = require('mongoose'),
      routes   = require('./src/Routes');

require('dotenv').config();

const app = express();

// Enable all CORS Requests
app.use(cors());

// Setup morgan which gives us HTTP request logging.
app.use(morgan(process.env.ENV));

// Support parsing of application/json and application/x-www-form-urlencoded post data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set app port.
app.set('port', process.env.PORT);

// Different routing segments
app.use('/api', routes);

// Standard 404
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// Error handler
const errorLogger = err => {
  console.error(`Error: ${JSON.stringify(err, null, 4)}`);

  return {
    message: `Error, ${err.message}`,
    error: process.env.ENV === 'prod' ? {} : err
  };
}

// Use global error handler 
app.use((err, req, res, next) => {
  res.status(500).json(errorLogger(err));

  next();
});

// Connect to the DB
mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => 
  console.log('Database Connected')
).catch(err =>
  errorLogger(err)
);

// Start listening
const server = app.listen(app.get('port'), () => {
  console.log(`App listening on port ${server.address().port}`);
});