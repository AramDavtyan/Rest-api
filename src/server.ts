import 'dotenv/config';
import * as express from 'express';
import * as bodyParser from "body-parser";
import * as Joi from 'joi';
import * as mongoose from 'mongoose';
import routes from './routes';
import config from './config/index';
import ErrorHandler from './middlewares/ErrorHandler';

class Server {
  private static _instance: Server;
  private app: express.Application;
  public RouteInit;
  public AuthRouteInit;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    mongoose.connect(`${config.db.HOST}/${config.db.NAME}`, err => {
      if (err) throw err;
      if (process.env.NODE_ENV == 'development') console.log('Mongo connected');
    })
    this.listen(process.env.PORT);
    this.getRoute();
    this.error();
  }

  public static bootstrap(): Server {
    if (Server._instance == null) {
      return Server._instance = new Server();
    }
    return Server._instance
  }

  private listen(port: Number): void {
    if (Server._instance == null) {
      this.app.listen(port, (): void => {
        if (process.env.NODE_ENV == 'development') console.log(port);
      })
    }
  }

  public getRoute(): void {
    this.app.use(process.env.APIVERSION, ...routes)
  }

  error(): void {
    ErrorHandler.error.call(this.app);
  }

}

let server = Server.bootstrap();