let Validator = require("fastest-validator");
let uid = require("uid-safe");
import TodoModel from "../models/todo.model";
import TodoRepository from "../repositories/todo.repository";
import ValidationError from "../models/validation.error.model";

class TodoService {
  private static todoValidator = new Validator();
  private static todoVSchema = {
    description: { type: "string", min: 1, max: 50 }
  };

  public static create(data: { description: string; expiration_date: Date }) {
    let todo = new TodoModel(
      uid.sync(18),
      data.description,
      data.expiration_date,
      new Date(),
      false
    );

    TodoService.validate(todo);

    return TodoRepository.create(todo);
  }

  public static update(guid: string, data: { is_completed: Boolean }) {
    let todo = TodoRepository.get(guid);

    if (todo) {
      todo.is_completed = data.is_completed;
      TodoService.validate(todo);
      TodoRepository.update(todo);

      return todo;
    }

    throw new Error("Unable to retrieve a todo by (guid:" + guid + ")");
  }

  public static retrieveAll() {
    return TodoRepository.getAll().sort(
      (a, b) => a.created_date.getTime() - b.created_date.getTime()
    );
  }

  public static retrieve(guid: string) {
    let todo = TodoRepository.get(guid);

    if (todo) {
      return todo;
    }

    throw new Error("Unable to retrieve a todo by (guid:" + guid + ")");
  }

  public static delete(guid: string) {
    let todo = TodoRepository.get(guid);

    if (todo) {
      TodoRepository.delete(todo);
    } else {
      throw new Error("Unable to retrieve a todo by (guid:" + guid + ")");
    }
  }

  public static validate(data: any) {
    const check = TodoService.todoValidator.compile(TodoService.todoVSchema);
    const result = check(data);

    if (result !== true) {
      throw new ValidationError("ValidationError", result);
    }
  }
}

export default TodoService;
