import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false,
    };

    this.todoService.addTodo(newTodo);
  }

  taskCheckedTodo(taskCheckedTodo: Todo) {
    this.todoService.taskChecked(taskCheckedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    if (
      this.todos.length > 0 &&
      confirm('Are you sure you want to clear all tasks?')
    ) {
      this.todoService.clearAll();
      this.loadTodos();
    }
  }

  clearCompletedTasks() {
    this.todoService.clearCompletedTasks();
    this.loadTodos();
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks
      ? this.todos
      : this.todos.filter((todo) => !todo.completed);
  }

  get labelClearAll() {
    return 'Limpar Tudo';
  }
  sortTodos() {
    this.todoService.sortTodosAZ();
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  exportTodos() {
    const doc = new jsPDF();
    let y = 10;

    doc.setFontSize(16);
    doc.text('Lista de Tarefas', 10, y);
    y += 10;

    this.todos.forEach((todo, index) => {
      const status = todo.completed ? '[X]' : '[ ]';
      const text = `${status} ${todo.title}`;
      doc.text(text, 10, y);
      y += 8;

      if (y > 280) {
        doc.addPage();
        y = 10;
      }
    });

    doc.save('lista-de-tarefas.pdf');
  }
}
