import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../../shared/models/todo.model';
import { TodoService } from 'src/app/shared/services/todo.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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
    this.newTaskTitle = this.todoService.filter(this.newTaskTitle)
    if(this.newTaskTitle.includes("*")){
      Swal.fire("Não é permitido cadastrar tarefas com palavras obscenas.")
      this.newTaskTitle = '';
    }else{
      if (this.newTaskTitle != '' && this.newTaskTitle.trim()) {
        if (this.editingTodo) {
          const updatedTodo: Todo = {
            ...this.editingTodo,
            title: this.newTaskTitle,
          };
          this.todoService.updateTodo(updatedTodo);
        } else {
          this.createNewTodos();
        }
  
        this.newTaskTitle = '';
        this.editingTodo = null;
      }
    }
  }

   private createNewTodos(): void {
    // Verifica se contém o separador |
    if (this.newTaskTitle.includes('|')) {
      // Divide o texto pelo separador | e cria múltiplas tarefas
      const taskTitles = this.newTaskTitle
        .split('|')
        .map(title => title.trim())
        .filter(title => title.length > 0); // Remove títulos vazios

      // Cria todas as tarefas de uma vez
      const newTodos: Todo[] = taskTitles.map(title => ({
        id: this.todoService.getTodoNewId(),
        title: title,
        completed: false
      }));

      this.todoService.addMultipleTodos(newTodos);
    } else {
      const newTodo: Todo = {
        id: this.todoService.getTodoNewId(),
        title: this.newTaskTitle,
        completed: false
      };
      this.todoService.addTodo(newTodo);
    }
  }

  get buttonText(): string {
    return this.editingTodo ? 'Atualizar' : 'Salvar';
  }
}
