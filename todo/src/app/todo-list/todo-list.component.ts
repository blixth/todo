import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { TodoModel } from "../models/todo-model";
import { TodoListModel } from '../models/todolist-model';

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.less"]
})
export class TodoListComponent implements OnInit {
  todoList: TodoListModel;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  private subscriber: Subscription;

  done(todo: TodoModel) {
    todo.is_completed = true;
    this.http.put(`/api/v1/todos/${todo.guid.toString()}`, todo).subscribe((response: any) => {
      todo = todo;
    }), (err: any) => console.log(err)
  }

  delete(todo: TodoModel) {
    this.http.delete(`/api/v1/todos/${todo.guid.toString()}`).subscribe((response: any) => {
      this.todoList.todos = this.todoList.todos.filter(t => t.guid !== todo.guid);
    }), (err: any) => console.log(err)
  }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe(params => {
      this.http.get("/api/v1/todos/").subscribe(
        (todoList: TodoListModel) => {
          this.todoList = todoList;
          console.log(this.todoList);
        },
        (err: any) => console.log(err)
      );
    });
  }
}
