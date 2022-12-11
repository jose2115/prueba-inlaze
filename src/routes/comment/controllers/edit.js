'use strict'
import models from '../../../connection/models/index'
import bcrypt from 'bcrypt'
async function editComment (req, res, next) {
  try {
    const { ...newComment } = req.body
    const id = req.params.id

    const commentFound = await models.comments.findOne({
      where : {
        id : {[models.Sequelize.Op.like] : id}
      }
    })

    commentFound.title   = newComment.title
    commentFound.comment = newComment.comment

    await commentFound.save()
 
    return res.status(200).send({ message: 'comentario actualizado'})
    
  } catch (e) {
    next(e)
  }
}



async function userExist (newUser, res) {
  const userFound = await models.users.findOne({
    where: {
      email: { [models.Sequelize.Op.like]: newUser.email }
    }
  })
  if (userFound) {
    return res.status(200).send({ message: 'El correo ya ha sido registrado' })
    //throw new Error('{"status": 500, "name": "DB error user alradyExist", "message": "El correo ya ha sido registrado"}')
  }
}


export { editComment }
