import * as jwt from 'jsonwebtoken';
import config from '../config';
import 'dotenv/config';

export default async (req, res, next) => {
  let token = req.headers['auth'];
  if (!token) {
    return res.status(config.status.FORBIDDEN).json({ errmsg: 'Forbidden no token !' });
  }
  try {
    let tokenObj = jwt.verify(token, process.env.ACCESS_TOKEN);
  }
  catch ({ errmsg }) {
    return res.status(config.status.BAD_REQUEST).json({ errmsg: 'Bad Request' });
  }
  next();
}