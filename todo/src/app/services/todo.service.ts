import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { ITodo } from "../interfaces/todo.interface";
import { ITodoList } from "../interfaces/todo-list.interface";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  baseUrl: string = "/api/v1/todos/";

  constructor(private http: HttpClient) {}

  getTodos(): Observable<ITodoList> {
    return this.http.get<ITodoList>(this.baseUrl);
  }

  updateTodo(todo: ITodo): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.baseUrl}${todo.guid.toString()}`, todo);
  }

  deleteTodo(guid: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${guid}`);
  }

  createTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>("/api/v1/todos", todo);
  }
}
