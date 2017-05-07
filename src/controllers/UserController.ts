import * as express from 'express';
import model from '../models';
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
          user = await model.User.findOne({ email });
        if (!user) res.status(config.status.SERVER_ERROR).json({ message: 'This email does not exist' });
        let newPassword = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5),
          newPasswordhash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
        newPasswordhash = newPasswordhash.replace(new RegExp('/', 'g'), '~');
        let HashUrl = `http://${process.env.HOST}:${process.env.PORT}/api/v1/forgot/${newPasswordhash}`,
          passhash = await model.Newpass.findById({ id: user._id }).remove();  //findOne
        let newpasshash = await new model.Newpass({ id: user._id, newpass: newPasswordhash }).save();
        res.json(newPasswordhash);
        if (newpasshash) res.json({ message: 'Password has been sent to specified email ' });
      }
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async forGotToken(req, res, next) {
    try {
      if (req.params) res.json(req.params);
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async forGotUpdate(req, res, next) {
    try {
      let token = req.body.token,
        newpass = await model.Newpass.findOne({ newpass: token }),
        newpassword = newpass.newpass.replace(new RegExp('~', 'g'), '/'),
        user = await model.User.update({ _id: newpass.id }, { $set: { password: newpassword } })

      if (user) res.status(config.status.SUCCESS).json({ message: 'Password successfully updated' })
    } catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async get(req, res, next) {
    try {
      if (req.params.id) {
        let user = await model.User.findById({ _id: req.params.id }); //findOne
        res.json(user);
      }
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async edit(req, res, next) {
    try {
      let error = validators.auth.signUp(req, res);
      if (error) {
        res.status(config.status.SERVER_ERROR).json(error.details);
      } else {
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
        let user = await model.User.update({ _id: req.params.id }, { $set: req.body });
        if (user) res.status(config.status.SUCCESS).json({ message: 'Profil successfully updated' })
      }
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }

  async delete(req, res, next) {
    try {
      let user = await model.User.findByIdAndRemove({ _id: req.params.id });
      if (user) res.status(config.status.SUCCESS).json({ message: 'Profil successfully deleted' })
      res.status(config.status.NOT_FOUND).json({ errmsg: 'Not found' });
    }
    catch (err) {
      next({ status: config.status.SERVER_ERROR, errmsg: 'Server error' })
    }
  }
}

export default new UserController();