import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Todo } from '../models/todo.model';
import { Filter } from 'bad-words';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos!: Todo[];
  private editingTodoSubject = new BehaviorSubject<Todo | null>(null);

  editingTodo$ = this.editingTodoSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  private loadFromLocalStorage(): void {
    const todosJson = localStorage.getItem('todos');
    this.todos = todosJson
      ? JSON.parse(todosJson)
      : [
          {
            id: 1,
            title: 'make an awesome angular todo-list',
            completed: true,
          },
          {
            id: 2,
            title: 'deploy my awesome angular todo-list project on github.io',
            completed: true,
          },
          {
            id: 3,
            title: 'think about tasks I can example on my to do list project',
            completed: false,
          },
          {
            id: 4,
            title: 'give up about the exemples (you already have them)',
            completed: false,
          },
          {
            id: 5,
            title: "what can I do next? Let's do a new project! :)",
            completed: false,
          },
        ];
    this.sortCompletedTodos();
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  private updateLocalStorageAndSave(): void {
    this.saveToLocalStorage();
  }

  addTodo(newTodo: Todo): void {
    this.todos.push(newTodo);
    this.sortCompletedTodos();
    this.updateLocalStorageAndSave();
  }

  addMultipleTodos(newTodos: Todo[]): void {
    this.todos.push(...newTodos);
    this.sortCompletedTodos();
    this.updateLocalStorageAndSave();
  }

  filter(badword: string) {
    const filter = new Filter();
    return filter.clean(badword);
  }

  taskChecked(taskCheckedTodo: Todo): void {
    const index = this.todos.findIndex(
      (todo) => todo.id === taskCheckedTodo.id
    );
    if (index !== -1) {
      this.todos[index] = taskCheckedTodo;
      this.sortCompletedTodos();
      this.updateLocalStorageAndSave();
    }
  }

  // Método para definir qual todo está sendo editado
  setEditingTodo(todo: Todo): void {
    this.editingTodoSubject.next(todo);
  }

  // Método para atualizar o todo
  updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
      this.sortCompletedTodos();
      this.updateLocalStorageAndSave();
      // Limpar o estado de edição
      this.editingTodoSubject.next(null);
    }
  }

  deleteTodo(todoId: number): void {
    const index = this.todos.findIndex((todo) => todo.id === todoId);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.sortCompletedTodos();
      this.updateLocalStorageAndSave();
    }
  }

  getTodoNewId(): number {
    return this.todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1;
  }

  sortCompletedTodos() {
    this.todos.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      } else if (!a.completed && b.completed) {
        return -1;
      } else {
        return 0;
      }
    });
  }
  sortTodosAZ(): void {
    const incompletos = this.todos
      .filter((todo) => !todo.completed)
      .sort((a, b) => a.title.localeCompare(b.title));

    const completos = this.todos.filter((todo) => todo.completed);

    this.todos = [...incompletos, ...completos];
    this.updateLocalStorageAndSave();
  }

  clearAll() {
    this.todos = [];
    this.updateLocalStorageAndSave();
  }

  clearCompletedTasks() {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Você tem certeza que quer limpar as tarefas concluídas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deleta!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Pronto!',
          text: 'Sua lista foi limpa.',
          icon: 'success',
        });
        this.todos = this.todos.filter(({ completed }) => completed === false);
        this.updateLocalStorageAndSave();
      }
    });
  }
}
