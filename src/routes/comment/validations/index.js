'use strict'
import { Joi, validate } from 'express-validation'

const createComment = validate({
  body: Joi.object({
    title: Joi.string().required(),
    comment: Joi.string().required(),
  })
}, {}, {})

const editComment = validate({
  body: Joi.object({
    title: Joi.string().required(),
    comment: Joi.string().required(),
  })
}, {}, {})


export default { createComment, editComment }
/**
 * routes/user/validations/user.validation
 */
