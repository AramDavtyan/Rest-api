import config from '../config';
class ErrorHandler {
  error(this) {
    this.use((err, req, res, next) => {
      let { status = config.status.SERVER_ERROR, errmsg } = err;
      res.status(status).json(errmsg);
    })
  }
}

let errorhandler = new ErrorHandler()
export default errorhandler;