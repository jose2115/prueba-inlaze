'use strict'
import express from 'express'
import UserController from './controllers'
import validations from './validations'
import jwtMidleware from '../../middlewares/validationToken'

const UsersRouter = express.Router()

UsersRouter.post(
  '/login',
  [validations.login],
  UserController.login
)

UsersRouter.post(
  '/create', 
  [validations.createUser],
  UserController.createUser
)

UsersRouter.get(
  '/show', 
  [jwtMidleware.verifyToken],
  UserController.showUser
)


export { UsersRouter }
