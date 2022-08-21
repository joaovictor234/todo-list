const fs = require('fs');
const { get } = require('http');
const path = require('path');
const { v4 } = require('uuid');

const p = path.join(path.dirname(require.main.filename), 'data', 'todo.json');

const getTodoListFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if(err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  })
}

module.exports = class Todo {
  constructor(title) {
    this.title = title;
    this.id = v4();
    this.isChecked = false;
    this.changeChecked = () => this.isChecked = true;
  }

  save() {
    getTodoListFromFile(todoList => {
      todoList.push({
        title: this.title,
        id: this.id,
        isChecked: this.isChecked 
      });
      fs.writeFile(p, JSON.stringify(todoList), err => console.log(err));
    })
  }

  static fetchAll(cb) {
    getTodoListFromFile(cb);
  }

  static fetchById(todoId, cb) {
    getTodoListFromFile(todoList => {
      const todo = todoList.filter(todo => todo.id === todoId);
      if(todo) {
        cb(todo);
      } else {
        cb({})
      }
    })
  }

  static changeChecked(todoId) {
    getTodoListFromFile(todoList => {
      const updatedTodoList = todoList.map(todo => {
        if(todo.id === todoId) {
          todo.isChecked = !todo.isChecked;
        }
        return todo;
      })
      fs.writeFile(p, JSON.stringify(updatedTodoList), err => console.log(err));
    })
  }

  static updateTodo(todoId, updateTitle) {
    getTodoListFromFile(todoList => {
      const updateTodoList = todoList.map(todo => {
        if(todo.id === todoId) {
          todo.title = updateTitle;
        }
        return todo;
      })
      fs.writeFile(p, JSON.stringify(updateTodoList), err => console.log(err));
    })
  }

  static deleteTodoById(todoId) {
    getTodoListFromFile(todoList => {
      const updatedTodoList = todoList.filter(todo => todo.id !== todoId);
      fs.writeFile(p, JSON.stringify(updatedTodoList), err => console.log(err));
    })
  }
}