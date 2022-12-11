'use strict'
import models from '../../../connection/models/index'
import jwtService from '../../../services/jwt.service'

async function showUser (req, res, next) {
  try {

    const token = await jwtService.decodeTokenFromHeaders(req.headers)

    const user = await models.users.findOne({
      attributes: ['id', 'nickName', 'name', 'email'],
      where: {
        id:  token.id

      },
    })

    return res.status(200).send({ user })
    
  } catch (e) {
    next(e)
  }
}

export { showUser }
