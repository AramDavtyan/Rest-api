import * as express from 'express';
import * as bodyParser from "body-parser";
import CheckToken from '../middlewares/CheckToken';
import UserController from "../controllers/UserController";
let router: express.Router = express.Router();

router.post('/user/forgot', UserController.forGot) //forgot password
router.get('/user/forgot/:token', UserController.forGotToken) //get new password 
router.put('/user/forgot/', UserController.forGotUpdate) //update new password 
router.get('/user/:id', CheckToken, UserController.get) //get user 
router.put('/user/:id', CheckToken, UserController.edit) //edit user
router.delete('/user/:id', CheckToken, UserController.delete) //delete user

export { router }