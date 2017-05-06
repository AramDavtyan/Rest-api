import * as express from 'express';
import { User } from '../models/User';
import * as bcrypt from 'bcryptjs';
import config from '../config';
import 'dotenv/config';
import validators from '../validators';
class UserController {
  async forGot(req, res, next) {
    try {
      let error = validators.user.forgot(req, res);
      if (error) {
        res.status(config.status.SERVER_ERROR).json(error.details);
      } else {
        let { email } = req.body,
          user = await User.findOne({ email });
        if (!user) res.status(config.status.SERVER_ERROR).json({ message: 'This email does not exist' });
        let newPassword = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        let HashUrl = `http://${process.env.HOST}:${process.env.PORT}/api/v1/forgot/${newPassword}/${user._id}`;
        res.json({ message: 'Password has been sent to specified email ' });
      }
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async forGotId(req, res, next) {
    try {
      if (req.params) res.json(req.params);
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async forGotUpdate(req, res, next) {
    try {
      let salt = bcrypt.genSaltSync(10),
        passwordHash = bcrypt.hashSync(req.body.passwordhash, salt);
      if (!req.body.id || !req.body.passwordhash) res.status(config.status.SUCCESS).json({ message: 'Password successfully updated' })
    } catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async get(req, res, next) {
    try {
      if (req.params.id) {
        let user = await User.findOne({ _id: req.params.id });
        res.json(user);
      }
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async edit(req, res, next) {
    try {
      if (!req.body.login || !req.body.password) res.json({ mssg: 'This field is required' })
      let salt = bcrypt.genSaltSync(10),
        passwordHash = bcrypt.hashSync(req.body.password, salt),
        user = await User.update({ _id: req.params.id }, { $set: { login: req.body.login, password: passwordHash } });
      res.status(config.status.SUCCESS).json({ message: 'Profil successfully updated' })
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async delete(req, res, next) {
    try {
      if (!req.params.id) res.status(config.status.FORBIDDEN).json({ errmsg: 'Forbidden' });
      let user = await User.remove({ _id: req.params.id });
      res.json(user);
      res.status(config.status.SUCCESS).json({ message: 'Profil successfully deleted' })
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }
}

export default new UserController();