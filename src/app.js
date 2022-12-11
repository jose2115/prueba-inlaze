'use strict'
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import cors from 'cors'

// Importar routers aquí
import IndexRouter from './routes/'
const { errorMiddleware } = require('./middlewares/errors')
const helmet = require('helmet')

const app = express()

app.use(helmet())
app.use(cors()) // Para peticiones CORS
/*
Cree una nueva función de middleware morgan logger utilizando el formato y las opciones dados. El argumento de formato puede ser una cadena de un nombre predefinido (vea los nombres a continuación), una cadena de una cadena de formato o una función que producirá una entrada de registro.
La función de formato se llamará con tres argumentos tokens, req y res, donde tokens es un objeto con todos los tokens definidos, req es la solicitud HTTP y res es la respuesta HTTP.
*/
app.use(logger('dev'))
/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas JSON y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza JSON y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta cualquier codificación Unicode del cuerpo y admite la inflación automática de codificaciones gzip y desinflar.
*/
app.use(express.json({ limit: '50mb' }))
/*
Esta es una función de middleware incorporada en Express. Analiza las solicitudes entrantes con cargas útiles codificadas por urlen y se basa en el analizador del cuerpo.
Devuelve el middleware que solo analiza los cuerpos codificados por urlen y solo mira las solicitudes donde el encabezado Content-Type coincide con la opción type. Este analizador acepta solo la codificación UTF-8 del cuerpo y admite el inflado automático de codificaciones gzip y desinflado.
*/
app.use(express.urlencoded({ extended: false, limit: '50mb' }))

/*

Analice el encabezado de la cookie y complete req.cookies con un objeto marcado por los nombres de las cookies. Opcionalmente, puede habilitar el soporte de cookies firmadas pasando una cadena secreta, que asigna req.secret para que pueda ser utilizada por otro middleware.
*/
app.use(cookieParser())
/*
Esta es una función de middleware incorporada en Express. Sirve archivos estáticos y se basa en serve-static.
El argumento raíz especifica el directorio raíz desde el que se sirven los activos estáticos. La función determina el archivo a servir combinando req.url con el directorio raíz proporcionado. Cuando no se encuentra un archivo, en lugar de enviar una respuesta 404, llama a next () para pasar al siguiente middleware, lo que permite el apilamiento y los retrocesos.
*/
app.use(express.static(path.join(__dirname, 'public')))

// Routes globals
app.get('/hola',(req, res, next )=>{
    return res.status(200).send({message: 'Hola mundo'})
})
app.use('/api/v1', IndexRouter)
app.use(errorMiddleware)

export default app
