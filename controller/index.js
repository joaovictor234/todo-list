const Todo = require('../models/Todo');

exports.renderHome = (req, res, next) => {
  Todo
    .fetchAll()
    .then(todos => {
      const todoList = todos[0].map(t => {
        let todo = {
          id: t.id,
          title: t.title,
          isChecked: t.ischecked ? true : false
        }
        return todo;
      })
      res.render('home', {
        todoList: todoList,
        todoEdit: {},
        edit: false
      })
    })
    .catch(err => console.error(err))
}

exports.postTodo = (req, res, next) => {
  const todo = new Todo(req.body.title);

  todo
    .save()
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
}

exports.postTodoChangeChecked = (req, res, next) => {
  const todoId = req.body.todoId;
  Todo
    .fetchById(todoId)
    .then(todo => {
      console.log(todo[0][0])
      let isChecked = todo[0][0].ischecked ? true : false;
      Todo
        .changeChecked(todoId, isChecked)
        .then(() => res.redirect('/'))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err));
}

exports.getEditTodo = (req, res, next) => {
  const todoId = req.params.todoId;

  Todo
    .fetchById(todoId)
    .then(todo => {
      res.render('home', {
        todoList: [],
        todoEdit: todo[0][0],
        edit: true
      })
    })
    .catch(err => console.error(err))
}

exports.postEditTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  const updateTitle = req.body.title;
  Todo
    .updateTodo(todoId, updateTitle)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err));
}

exports.deleteTodo = (req, res, next) => {
  const todoId = req.body.todoId;
  Todo
    .deleteTodoById(todoId)
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
}