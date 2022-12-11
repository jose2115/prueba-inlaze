'use strict'
import models from '../../../connection/models/index'
import bcrypt from 'bcrypt'
import jwtService from '../../../services/jwt.service'

async function login (req, res, next) {
  console.log(req.body)
  // console.log({ res })
  try {
    const { email, password } = getEmailPasswordFromRequestBody(req)
    const userFound = await findUser(email)
    isUserFound(userFound)
    await verifyUserPasswordCanAcces(password, userFound.password)
    
    const createTokenParams = defineTokenParams(userFound)
    const token = jwtService.createToken(createTokenParams)
    console.log(token)
    return res.status(200).send({ token })
  } catch (e) {
    console.log(e)
    next(e)
  }
}

function getEmailPasswordFromRequestBody (req) {
  const email = req.body.email
  const password = req.body.password
  return { email, password }
}
/**
 * @param {string} email The email of user to be found.
 * @returns {Promise} A promise waiting for the user from DB
 */
function findUser (email) {
  return models.users.findOne({
    attributes: ['id', 'name', 'email', 'password'],
    where: { email: email },
  })
}
function isUserFound (userFound) {
  if (!(userFound instanceof models.users)) { // !userFound also works
    throw new Error('{"status": 400, "name": "User Not Found", "message": "El usuario no ha sido encontrado"}')
    // return res.status(400).send({ message: 'El usuario no ha sido encontrado' })
  }
}
async function verifyUserPasswordCanAcces (inputPassword, userPassword) {
  const canAccess = await bcrypt.compare(inputPassword, userPassword)
  if (!canAccess) {
    throw new Error('{"status": 400, "name": "Wrong Password", "message": "Contraseña incorrecta"}')
  }
}

async function getUserRoles (user) {
  const userRoles = await models.roles.findAll({
    attributes: ['role'],
    include: [{
      model: models.users,
      attributes: [],
      through: { attributes: [] },
      where: { id: user.id }
    }, {
      model: models.states,
      attributes: [],
      where: {
        state: 'roleEnabled'
      }
    }]
  })
  const roles = []
  for (const role of userRoles) {
    roles.push(role.role)
  }
  return roles
}

async function getUserPermissions (roles) {
  const userPermissions = await models.permissions.findAll({
    attributes: ['permission'],
    include: [{
      model: models.roles,
      attributes: [],
      through: { attributes: [] },
      where: {
        role: {
          [models.Sequelize.Op.in]: roles
        }
      }
    }, {
      model: models.states,
      attributes: [],
      where: {
        state: 'permissionEnabled'
      }
    }]
  })
  const permissions = []
  for (const permission of userPermissions) {
    permissions.push(permission.permission)
  }
  return permissions
}
function defineTokenParams (userFound) {
  return {
    id: userFound.id,
    email: userFound.email,
    name: userFound.name,
  }
}

export { login }
