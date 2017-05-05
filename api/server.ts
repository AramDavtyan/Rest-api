import 'dotenv/config'
import * as express from 'express';
import Route from './routes/Route';
import ErrorHandler from './middlewares/ErrorHandler'



class Server {
  private static _instance: Server;
  private app: express.Application;
  public RouteInit;
  private apiVersion: string;
  constructor() {
    this.apiVersion = '/api/v1';
    this.app = express();
    this.listen(process.env.PORT);
    this.RouteInit = new Route();
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
    this.app.use(this.apiVersion, this.RouteInit.route())
  }

  error() {
    ErrorHandler.error.call(this.app);
  }

}

let server = Server.bootstrap();




// app.listen(3000, function () {
//   console.log('success');
// })





// app.get('/', function (req, res) {
//   res.end('asdasd');
// })

// var e: string = 'asdasd';


// function admin(): void {
//   e = '4444';
// }