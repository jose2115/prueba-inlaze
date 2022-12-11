'use strict'
import express from 'express'
import CommentController from './controllers'
import validations from './validations'
import jwtMidleware from '../../middlewares/validationToken'

const CommentRouter = express.Router()


CommentRouter.post(
  '/create', 
  [validations.createComment],
  [CommentController.createComment]
)

CommentRouter.put(
  '/edit/:id',
  [jwtMidleware.verifyToken],
  [validations.editComment],
  [CommentController.editComment]
)

CommentRouter.delete(
  '/destroy/:id',
  [jwtMidleware.verifyToken],
  [CommentController.destroyComment]
)

CommentRouter.get(
  '/list',
  [jwtMidleware.verifyToken],
  [CommentController.listComment]
)


CommentRouter.get(
  '/show/:id',
  [jwtMidleware.verifyToken],
  [CommentController.showComment]
)










export { CommentRouter }
