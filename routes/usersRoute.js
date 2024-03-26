import express from 'express'
import asyncHandler from 'express-async-handler'
import {
  registerUserController,
  loginUserControl,
} from '../controllers/usersController.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUserController)
userRoutes.post('/login', loginUserControl)

export default userRoutes
