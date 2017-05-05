import * as express from 'express';
import User from '../models/User'

class UserController {
  async getUsers(req, res) {
    res.json({ message: 'all users' });
  }
  async createUsers(req, res) {
    res.json({ message: 'create users' });
  }
  async sunglUsers(req, res) {
    res.json({ message: 'sungl users' });
  }
  async editUsers(req, res) {
    res.json({ message: 'edit users' });
  }
  async deleteUsers(req, res) {
    res.json({ message: 'delete users' });
  }
}

export default new UserController();