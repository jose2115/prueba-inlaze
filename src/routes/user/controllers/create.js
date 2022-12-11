'use strict'
import models from '../../../connection/models/index'
import bcrypt from 'bcrypt'
async function createUser (req, res, next) {
  try {
    const { role, ...newUser } = req.body

    await userExist(newUser, res)
  
    const userCreated = await models.users.create(
      {
        nickName: newUser.nickName,
        name: newUser.name,
        email: newUser.email,
        password: await bcrypt.hash(newUser.password, 10) }
    )
 
    return res.status(200).send({ message: 'El usuario fue creado con exito.' })
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


export { createUser }
