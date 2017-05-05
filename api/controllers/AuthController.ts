import * as express from 'express'
import User from '../models/User'
import * as jwt from 'jsonwebtoken'
import 'dotenv/config'


class AuthController {

  async SignUp(req, res, next) {
    try {
      const NewUser = new User(req.body);
      const user = await NewUser.save();
      res.status(201).json(user);
    }
    catch (message) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async SignIn(req, res, next) {
    try {
      const { login, password } = req.body;
      const user = await User.findOne({ login })
      if (!user) res.json('Login or password incorecct');
      const ACCESS_TOKEN = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN);
      res.json(ACCESS_TOKEN);
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

}

export default new AuthController();