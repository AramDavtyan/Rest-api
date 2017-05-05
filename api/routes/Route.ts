import * as express from 'express';
import * as bodyParser from "body-parser";
import CheckToken from '../middlewares/CheckToken'
import AuthController from "../controllers/AuthController";
import UserController from "../controllers/UserController";

export default class Route {
  private app: express.Application;
  constructor() {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
  private route(): Express.Application {
    this.app.post('/signup', AuthController.SignUp) //registration user
    this.app.post('/signin', AuthController.SignIn) //login user

    this.app.get('/users', CheckToken, UserController.getUsers) //get all users
    this.app.post('/users', UserController.createUsers) //create a user
    this.app.get('/users/user_id', UserController.sunglUsers) //get single user
    this.app.put('/users/user_id', UserController.editUsers) //update user
    this.app.delete('/users/user_id', UserController.deleteUsers) //delete user
    return this.app;
  }

}



