'use strict'
import models from '../../../connection/models/index'
import bcrypt from 'bcrypt'
async function listComment (req, res, next) {
  try {
    
    const model = {
      order: [
        ['updatedAt', 'DESC'],
      ],
      include: [
          {
              model: models.users,
              required: false,
          }
        ]
    }
  
  const list = await models.comments.findAll(model)

  return res.status(200).send({ list })

  } catch (e) {
    next(e)
  }
}



export { listComment }
