import express from 'express'
import { createCategoryController } from '../controllers/categoriesController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const categoryRoutes = express.Router()

categoryRoutes.route('/').post(isLoggedIn, createCategoryController)

export default categoryRoutes
