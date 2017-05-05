class ErrorHandler {
  error(this) {
    this.use((err, req, res, next) => {
      let { status = '404', errmsg } = err;
      res.status(status).json(errmsg);
    })
  }
}

let errorhandler = new ErrorHandler()
export default errorhandler;