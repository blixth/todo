let Validator = require("fastest-validator");
let uid = require("uid-safe");
import TodoModel from "../models/todo.model";

class TodoService {
  private static todos = [] as Array<TodoModel>;
  private static todoValidator = new Validator();
  private static todoVSchema = {
    description: { type: "string", min: 1, max: 50 }
  };

  public static create(data: { description: String; expiration_date: Date }) {
    let todo = new TodoModel(
      uid.sync(18),
      data.description,
      data.expiration_date,
      new Date(),
      false
    );
    TodoService.todos.push(todo);

    return todo;
  }

  public static update(guid: string, data: { is_completed: Boolean }) {
    let todo = TodoService.todos.find(t => t.guid === guid);

    if (todo) {
      todo.is_completed = data.is_completed;

      return todo;
    }

    throw new Error("Unable to retrieve a todo by (guid:" + guid + ")");
  }

  public static retrieveAll() {
    return TodoService.todos.sort(
      (a, b) => a.created_date.getTime() - b.created_date.getTime()
    );
  }

  public static retrieve(guid: String) {
    let todo = TodoService.todos.find(t => t.guid === guid);

    if (todo) {
      return todo;
    }

    throw new Error("Unable to retrieve a todo by (guid:" + guid + ")");
  }

  public static delete(guid: string) {
    let todo = TodoService.todos.find(t => t.guid === guid);

    if (todo) {
      TodoService.todos = TodoService.todos.filter(t => t.guid !== guid);
    } else {
      throw new Error("Unable to retrieve a todo by (guid:" + guid + ")");
    }
  }

  public static validate(data: any) {
	const check = this.todoValidator.compile(this.todoVSchema);
	const result = check(data);

    if (result !== true) {
      throw {
        name: "ValidationError",
        message: result
      };
    }
  }
}

export default TodoService;
