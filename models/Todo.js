const db = require('../util/database');
const { v4 } = require('uuid');

module.exports = class Todo {
  constructor(title) {
    this.title = title;
    this.id = v4();
    this.isChecked = false;
    this.changeChecked = () => this.isChecked = true;
  }

  save() {
    return db.execute('INSERT INTO todo (id, title, ischecked) VALUES (?, ?, ?)',
    [this.id, this.title, this.isChecked]
    )
  }

  static fetchAll() {
    return db.execute('SELECT * FROM todo');
  }

  static fetchById(todoId) {
    return db.execute('SELECT * FROM todo WHERE todo.id = ?', [todoId])
  }

  static changeChecked(todoId, isChecked) {
    let checked = isChecked ? 0 : 1;
    return db.execute(`UPDATE todo SET ischecked = ? WHERE id = ?`, [checked, todoId]);
  }

  static updateTodo(todoId, updateTitle) {
    return db.execute('UPDATE todo SET title = ? WHERE id = ?',
    [updateTitle, todoId])
  }

  static deleteTodoById(todoId) {
    return db.execute('DELETE FROM todo WHERE id = ?', [todoId]);
  }
}