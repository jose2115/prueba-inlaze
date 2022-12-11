'use strict'
import { Joi, validate } from 'express-validation'

const login = validate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}, {}, {})


const createUser = validate({
  body: Joi.object({
    nickName: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    password2: Joi.string().required(),
  })
}, {}, {})


export default { login,  createUser}
/**
 * routes/user/validations/user.validation
 */
