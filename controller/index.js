const Todo = require('../models/Todo');

exports.renderHome = (req, res, next) => {
  Todo.fetchAll(todoList => {
    res.render('home', {
      todoList: todoList,
      todoEdit: {},
      edit: false
    })
  })
}

exports.postTodo = (req, res, next) => {
  const todo = new Todo(req.body.title);
  todo.save();
  res.redirect('/');
}

exports.postTodoChangeChecked = (req, res, next) => {
  const todoId = req.body.todoId;
  Todo.changeChecked(todoId);
  res.redirect('/');
}

exports.getEditTodo = (req, res, next) => {
  const todoId = req.params.todoId;
  Todo.fetchById(todoId, todo => {
    res.render('home', {
      todoList: [],
      todoEdit: todo[0],
      edit: true
    })
  })
}

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  const updateTitle = req.body.title;
  Todo.updateTodo(todoId, updateTitle);
  res.redirect('/');
}

exports.deleteTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  Todo.deleteTodoById(todoId);
  res.redirect('/');
}