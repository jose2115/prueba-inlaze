import jwt from 'jsonwebtoken'
import moment from 'moment-timezone'
import config from '../services/config'

const createToken = (inPayload) => {
  try {
    // console.log({ inPayload })
    const now = moment()
    const payload = inPayload
    payload.iat = now.unix()
    payload.exp = now.add(6, 'years').unix()
    const token = jwt.sign(payload, config.secretJWT)
    return token
  } catch (error) {
    // console.log('Hubo un error generando el token: ', error) it should be a throw but well...
    return null
  }
}

const decodeToken = async (token) => {
  return jwt.decode(
    token,
    config.secretJWT
  )
}

const decodeTokenFromHeaders = (headers) => {
  const authHeader = headers.authorization
  const authToken = authHeader.split(' ')[1]
  return decodeToken(authToken)
}

export default { createToken, decodeToken, decodeTokenFromHeaders }
