'use strict';

var apiVersion = require('../config/api.config');

module.exports = function(app) {
	var userAuthHandlers = require('../controllers/userAuth.controller.js');

  app.route('/auth/register')
		.post(userAuthHandlers.register);

	app.route('/auth/signin')
		.post(userAuthHandlers.login);
};