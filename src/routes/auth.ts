import * as express from 'express';
import AuthController from "../controllers/AuthController";
let router = express.Router();

router.post('/signup', AuthController.SignUp);
router.post('/signin', AuthController.SignIn);
export { router };