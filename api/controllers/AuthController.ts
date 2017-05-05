import * as express from 'express'
import User from '../models/User'
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import 'dotenv/config'


class AuthController {

  async SignUp(req, res, next) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const NewUser = new User({ login: req.body.login, password: hash });
      const user = await NewUser.save();
      res.status(201).json(user);
    }
    catch (message) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async SignIn(req, res, next) {
    try {
      var { login, password } = req.body;
      const user = await User.findOne({ login });
      if (!user) res.status(401).json('Login or password incorecct');
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const ACCESS_TOKEN = jwt.sign({ _id: user._id }, process.env.ACCESS_TOKEN);
        const User = { _id: user._id, login: user.login, password: user.password, access_token: ACCESS_TOKEN }
        res.json(User);
      } else {
        res.status(401).json('Login or password incorecct');
      }
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

}

export default new AuthController();