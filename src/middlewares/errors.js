'use strict'
// const logger = require('../services/log.service')
// const { ValidationError } = require('express-validation')
import { logger } from '../services/log.service'
import { ValidationError } from 'express-validation'
// logger.logger.error
const errorMiddleware = (error, req, res, next) => {
  let errorObject
  logger.error(error)
  try {
    if (typeof error.toJson === 'function') {
      errorObject = error.toJson()
    } else if (error instanceof ValidationError) {
      errorObject = {
        status: error.statusCode,
        name: 'ValidationError',
        message: error.message ? error.message : 'Validation Failed'
      }
    } else if (error instanceof Error) {
      errorObject = JSON.parse(error.message)
    } else {
      throw new Error()
    }
  } catch (e) {
    errorObject = {
      status: 500,
      name: 'UnkwnownError',
      message: 'Unkwnown Error'
    }
  }
  return res.status(errorObject.status).json(errorObject)
}
export { errorMiddleware }
