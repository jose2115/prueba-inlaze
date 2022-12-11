'use strict'
import models from '../../../connection/models/index'
import jwtService from '../../../services/jwt.service'

async function showComment (req, res, next) {
  try {
    const id = req.params.id
    const comment = await models.comments.findOne({
      where: {
        id:  id
      },
    })

    return res.status(200).send({ comment })
    
  } catch (e) {
    next(e)
  }
}

export { showComment }
