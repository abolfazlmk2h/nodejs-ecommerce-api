import express from 'express'
import {
  registerUserController,
  loginUserControl,
  getUserProfileController,
} from '../controllers/usersController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const userRoutes = express.Router()

userRoutes.post('/register', registerUserController)
userRoutes.post('/login', loginUserControl)
userRoutes.get('/profile', isLoggedIn, getUserProfileController)

export default userRoutes
