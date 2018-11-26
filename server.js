'use strict';

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Task = require('./models/task.model'),
  User = require('./models/user.model'),
  bodyParser = require('body-parser'),
  jsonwebtoken = require("jsonwebtoken");

console.log("Connecting to MongoDB in 'mongodb://localhost/Tododb'");

// mongoose.Promise = global.Promise;
var promise = mongoose.connect('mongodb://localhost/Tododb', {
  useMongoClient: true
});

promise.then(function(db) {
  db.model()
  console.log('MongoDB connection done');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

var routesAuth = require('./routes/authentication');
var routesTask = require('./routes/tasks');

routesAuth(app);
routesTask(app);

app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(port);

console.log('xxxx REST Gateway API server started on: ' + port);

module.exports = app;