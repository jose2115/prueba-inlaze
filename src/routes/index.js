'use strict'
import { UsersRouter } from './user'


import express from 'express'
import { CommentRouter } from './comment'

const app = express()

app.use('/user', UsersRouter)
app.use('/comment', CommentRouter)


export default app
