'use strict'
import models from '../../../connection/models/index'
import jwtService from '../../../services/jwt.service'

async function createComment (req, res, next) {
  try {
    const { ...newComment } = req.body
    
    const token = await jwtService.decodeTokenFromHeaders(req.headers)
 
    const userComment = await models.comments.create(
      {
        title: newComment.title,
        comment: newComment.comment,
        user_id : token.id
      }
    )
 
    return res.status(200).send({ message: 'Comentario creado' })
  } catch (e) {
    next(e)
  }
}


export { createComment }
