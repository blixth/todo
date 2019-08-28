import { Component, OnInit } from "@angular/core";
import { ITodo } from "../../interfaces/todo.interface";
import { ITodoList } from "../../interfaces/todo-list.interface";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.less"]
})
export class TodoListComponent implements OnInit {
  todoList: ITodoList;

  constructor(private todoService: TodoService) {}

  done(todo: ITodo) {
    todo.is_completed = true;

    this.todoService.updateTodo(todo).subscribe((updatedTodo: ITodo) => {
      todo = updatedTodo;
    }),
      (err: any) => console.log(err);
  }

  delete(todo: ITodo) {
    this.todoService.deleteTodo(todo.guid.toString()).subscribe(() => {
      this.todoList.todos = this.todoList.todos.filter(
        t => t.guid !== todo.guid
      );
    }),
      (err: any) => console.log(err);
  }

  ngOnInit() {
    this.todoService.getTodos().subscribe(
      (todoList: ITodoList) => {
        this.todoList = todoList;
        console.log(this.todoList);
      },
      (err: any) => console.log(err)
    );
  }
}
