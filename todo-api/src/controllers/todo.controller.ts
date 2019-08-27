import * as express from "express";
import TodoService from "../services/todo.services";

class TodosController {
  public path = "/todos";
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.get);
    this.router.post(this.path, this.post);
    this.router.put(`${this.path}/:id`, this.put);
    this.router.delete(`${this.path}/:id`, this.delete);
  }

  get = async (_request: express.Request, response: express.Response) => {
    const todos = await TodoService.retrieveAll();

    return response.json({ todos: todos });
  };

  post = async (
    request: express.Request,
    response: express.Response,
    next: (arg0: any) => void
  ) => {
    const body = request.body;

    try {
      await TodoService.validate(body);
      const todo = await TodoService.create(body);

      return response.status(201).json({ todo: todo });
    } catch (err) {
      if (err.name === "ValidationError") {
        return response.status(400).json({ error: err.message });
      }

      return next(err);
    }
  };

  put = async (
    request: express.Request,
    response: express.Response,
    next: (arg0: any) => void
  ) => {
    const body = request.body;

    try {
      await TodoService.validate(body);
      const todo = await TodoService.update(request.params.id, body);

      return response.status(200).json({ todo: todo });
    } catch (err) {
      if (err.name === "ValidationError") {
        return response.status(400).json({ error: err.message });
      }

      return next(err);
    }
  };

  delete = async (
    request: express.Request,
    response: express.Response,
    next: (arg0: any) => void
  ) => {
    try {
      await TodoService.delete(request.params.id);

      return response.json({ success: true });
    } catch (err) {
      return next(err);
    }
  };
}

export default TodosController;
