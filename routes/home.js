const express = require('express');

const route = express.Router();

const homeController = require('../controller/index');

route.get('/', homeController.renderHome);
route.post('/save-todo', homeController.postTodo);
route.post('/change-checked-todo', homeController.postTodoChangeChecked);
route.get('/edit-todo/:todoId', homeController.getEditTodo);
route.post('/update-todo', homeController.postEditTodo);
route.post('/delete-todo', homeController.deleteTodo);

module.exports = route;