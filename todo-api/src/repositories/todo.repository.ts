import TodoModel from "models/todo.model";

class TodoRepository {
  private static todos = [] as Array<TodoModel>;

  public static create(todo: TodoModel) {
    TodoRepository.todos.push(todo);

    return todo;
  }

  public static get(guid: string) {
    return TodoRepository.todos.find(t => t.guid === guid);
  }

  public static getAll() {
    return TodoRepository.todos;
  }

  public static delete(todo: TodoModel) {
    TodoRepository.todos = TodoRepository.todos.filter(
      t => t.guid !== todo.guid
    );
  }

  public static update(todo: TodoModel) {
    TodoRepository.todos = TodoRepository.todos.filter(
      t => t.guid !== todo.guid
    );

    TodoRepository.todos.push(todo);
  }
}

export default TodoRepository;
