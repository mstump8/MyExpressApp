const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css'))) 
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'))) 
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Pass the error object to the error view
  res.status(err.status || 500);
  res.render('error', { error: err });
});


module.exports = app;
