'use strict';

module.exports = function(app) {
  var taskList = require('../controllers/todo.controller');
  var userHandlers = require('../controllers/userAuth.controller');

	// taskList Routes
	app.route('/tasks')
		.get(taskList.list_all_tasks)
		.post(userHandlers.loginRequired, taskList.create_a_task);

	app.route('/tasks/:taskId')
		.get(taskList.read_a_task)
		.put(taskList.update_a_task)
		.delete(taskList.delete_a_task);
};