const cookieParser = require('cookie-parser');
const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  require('cors')({
    origin: ['http://localhost:7891'],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/pets', require('./controllers/pets'));
app.use('/api/v1/userpets', require('./controllers/userpets'));
app.use('/api/v1/petScores', require('./controllers/petScores'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
