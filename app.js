require('dotenv/config');

var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// DB CONNECTION!
require('./config/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// HEROKU BUILD
app.use(express.static(path.join(__dirname, '/client-frontend/build')));

app.use(express.static(path.join(__dirname, 'public')));

// CORS STUFF
// DELETE THE LINES WHICH ARE COMMENTED OUT
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
const cors = require('cors');
app.use(cors());

// SESSION FILE CONNECTION
require('./config/session')(app);

app.use('/api/', indexRouter);

app.use('/users', usersRouter);
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const itemsRoutes = require('./routes/items');
app.use('/api/items', itemsRoutes);

const stripeRoutes = require('./routes/stripe');
app.use('/stripe', stripeRoutes);

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + '/client-frontend/build/index.html');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
