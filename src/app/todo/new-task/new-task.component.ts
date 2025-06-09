import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit, OnDestroy {
  newTaskTitle: string = '';
  editingTodo: Todo | null = null;
  private editingSubscription!: Subscription;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    // Inscreve-se para receber notificações de edição
    this.editingSubscription = this.todoService.editingTodo$.subscribe(
      (todo) => {
        this.editingTodo = todo;
        if (todo) {
          this.newTaskTitle = todo.title;
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.editingSubscription) {
      this.editingSubscription.unsubscribe();
    }
  }

  addTask() {
    if (this.newTaskTitle != '' && this.newTaskTitle.trim()) {
      if (this.editingTodo) {
        // Está editando um todo existente
        const updatedTodo: Todo = {
          ...this.editingTodo,
          title: this.newTaskTitle,
        };
        this.todoService.updateTodo(updatedTodo);
      } else {
        // Criando um novo todo
        const newTodo: Todo = {
          id: this.todoService.getTodoNewId(),
          title: this.newTaskTitle,
          completed: false,
        };
        this.todoService.addTodo(newTodo);
      }

      this.newTaskTitle = '';
      this.editingTodo = null;
    }
  }

  get buttonText(): string {
    return this.editingTodo ? 'Atualizar' : 'Salvar';
  }
}
