import * as jwt from 'jsonwebtoken'
import 'dotenv/config'

export default async (req, res, next) => {
  let token = req.headers['auth'];
  if (!token) {
    return res.status(403).json({ errmsg: 'Forbidden no token !' });
  }
  try {
    let tokenObj = jwt.verify(token, process.env.ACCESS_TOKEN);
  }
  catch ({ errmsg }) {
    return res.status(400).json({ errmsg: 'Server error' });
  }
  next();
}