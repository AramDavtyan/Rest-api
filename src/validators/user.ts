import * as Joi from 'joi';

export let forgot = (req, res) => {
  let SignUp = Joi.object().keys({
    email: Joi.string().email()
  })
  return Joi.validate(req.body, SignUp, (error, value) => {
    return error
  })
}