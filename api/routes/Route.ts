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

    this.app.post('/forgot', UserController.forGot) //forgot password
    this.app.get('/forgot/:userpass/:id', UserController.forGotId) //get new password 
    this.app.put('/forgot/update', UserController.forGotUpdate) //update new password 

    this.app.get('/user/profil/:id', CheckToken, UserController.getUser) //get user 
    this.app.put('/user/profil/:id', CheckToken, UserController.editUser) //edit user
    this.app.delete('/user/profil/:id', CheckToken, UserController.deleteUsers) //delete user
    return this.app;
  }

}



