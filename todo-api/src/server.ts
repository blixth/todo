import App from "./app";
import TodoController from "./controllers/todo.controller";

const app = new App([new TodoController()], 3000);

app.listen();
