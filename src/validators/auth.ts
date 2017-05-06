import * as Joi from 'joi';

export let signIn = (req, res) => {
  let SignUp = Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  })
  return Joi.validate(req.body, SignUp, (error, value) => {
    return error
  })
}

export let signUp = (req, res) => {
  let SignUp = Joi.object().keys({
    firstname: Joi.string().min(3).max(30).required(),
    lastname: Joi.string().min(3).max(30).required(),
    login: Joi.string().min(3).max(30).required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  })
  return Joi.validate(req.body, SignUp, (error, value) => {
    return error
  })
}