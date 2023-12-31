const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
require("dotenv").config();
const logger = require('morgan');
const mongoose = require("mongoose")
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const messagesRouter = require('./routes/messages');
const cors = require("cors")
const app = express();
app.use(cors())
// view engine setup

const db_uri = process.env.DB_URI
mongoose.connect(db_uri , {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => {
  app.listen(3000, () => console.log("App started on port 3000"));
  console.log("connected to DB")})
.catch((err) => {console.log(err)});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rooms', roomsRouter);
app.use('/messages', messagesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




module.exports = app;
