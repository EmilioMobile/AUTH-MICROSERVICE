'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

/**
 * User Schema
 */
var UserSchema = new Schema({
  fullName: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true
  },
  hash_password: {
    type: String
  },
  created: {
    type: Date,
    default: Date.now
  }
});

//password: 
//  set: function(v) {
//    return bcrypt.hashSync(v, 10);
//  }


UserSchema.methods.comparePassword = function(password) {
  console.log(password)
  console.log(this.hash_password)

  if (bcrypt.compareSync(password, this.hash_password)) {
    console.log('true')
  } else {
    console.log('false')
  }

  return bcrypt.compareSync(password, this.hash_password);
};

mongoose.model('User', UserSchema);