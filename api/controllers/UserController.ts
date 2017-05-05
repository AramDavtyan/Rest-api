import * as express from 'express';
import User from '../models/User'
import * as bcrypt from 'bcryptjs'
import 'dotenv/config'

class UserController {
  async forGot(req, res, next) {
    try {
      let { login, email } = req.body;
      let user = await User.findOne({ login });
      if (!user) res.status(401).json('Login is incorecct');
      let newPassword = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
      let HashUrl = `http://${process.env.HOST}:${process.env.PORT}/api/v1/forgot/${newPassword}/${user._id}`;
      let NewUser = { login: user.login, email: email, password: newPassword, HashUrl: HashUrl };
      res.json(NewUser);
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async forGotId(req, res, next) {
    try {
      if (req.params) res.json(req.params);
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async forGotUpdate(req, res, next) {
    try {
      let salt = bcrypt.genSaltSync(10);
      let passwordHash = bcrypt.hashSync(req.body.userpass, salt);
      if (!req.body.id || !req.body.userpass) res.status(403).json({ errmsg: 'Forbidden' });
      let user = await User.update({ _id: req.body.id }, { $set: { password: passwordHash } });
      res.status(200).json({ message: 'Password successfully updated' })
    } catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async getUser(req, res, next) {
    try {
      if (req.params.id) {
        let user = await User.findOne({ _id: req.params.id });
        res.json(user);
      }
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async editUser(req, res, next) {
    try {
      if (!req.body.login || !req.body.password) res.json({ mssg: 'This field is required' })
      let salt = bcrypt.genSaltSync(10);
      let passwordHash = bcrypt.hashSync(req.body.password, salt);
      let user = await User.update({ _id: req.params.id }, { $set: { login: req.body.login, password: passwordHash } });
      res.status(200).json({ message: 'Profil successfully updated' })
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

  async deleteUsers(req, res, next) {
    try {
      if (!req.params.id) res.status(403).json({ errmsg: 'Forbidden' });
      let user = await User.remove({ _id: req.params.id });
      res.json(user);
      res.status(200).json({ message: 'Profil successfully deleted' })
    }
    catch (err) {
      next({ status: 400, errmsg: 'Server error' })
    }
  }

}

export default new UserController();