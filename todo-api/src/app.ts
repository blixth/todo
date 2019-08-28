import * as express from "express";
import * as bodyParser from "body-parser";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(this.loggerMiddleware);
  }

  private initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use("/api/v1", controller.router);
    });
  }

  private loggerMiddleware(
    request: express.Request,
    _response: express.Response,
    next: () => void
  ) {
    console.log(`${request.method} ${request.path}`);
    next();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;
