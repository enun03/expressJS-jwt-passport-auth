const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');
require('dotenv').config();

require('./auth/auth');
const UserModel = require('./models/user');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log('Server started.')
});