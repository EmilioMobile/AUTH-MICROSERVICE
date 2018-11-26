'use strict';

var mongoose = require('mongoose');
var jsonwebtoken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var User = mongoose.model('User');

exports.register = function(req, res) {

  /* validate req.body paramers
  fullName
  email
  password
  */

  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err, user) {
    if (err) {
      return res.status(400).send({
        message: err
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.login = function(req, res) {
  console.log(req.body)

  User.findOne({
    email: req.body.email
  }, function(err, user) {
    console.log(user)
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

    // signin user and generate a jwt
    const token = jsonwebtoken.sign({
      id: user.id,
      email: user.email
    }, 'somesuperdupersecret', { expiresIn: '1y' })

    return res.json(token);
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};