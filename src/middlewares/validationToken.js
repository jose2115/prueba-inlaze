import jwt from 'jsonwebtoken'
import config from '../services/config'
import moment from 'moment-timezone'

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader || authHeader === '') {
      return res
        .status(401)
        .send({ message: 'No cuenta con la cabecera de autenticación.' })
    }

    const isBearer = authHeader.split(' ')[0]
    if (isBearer !== 'Bearer') {
      return res
        .status(401)
        .send({ message: 'La cabecera de autenticación no es válida.' })
    }

    const authToken = authHeader.split(' ')[1]
    if (!authToken || authToken === '') {
      return res
        .status(401)
        .send({ message: 'La cabecera de autenticación no es válida.' })
    }

    const payload = jwt.verify(authToken, config.secretJWT)
    if (!payload) {
      return res
        .status(401)
        .send({ message: 'No tiene permiso para realizar esta operación.' })
    }
    const now = moment()
    // const diaD = moment('20200920', 'YYYYMMDD')
    // if (diaD.unix() < now.unix()) {
    //   return res.status(401).send({ message: 'Error no controlado.' })
    // }
    if (payload.exp < now.unix()) {
      return res.status(401).send({ message: 'El token ha expirado.' })
    }
    next()
  } catch (error) {
    // console.log('Hubo un error verificando el token: ', error)
    return res
      .status(401)
      .send({
        message:
          'Hubo un error verificando el token o ha expirado. Inicie sesión nuevamente e intente de nuevo.'
      })
  }
}

export default { verifyToken }
