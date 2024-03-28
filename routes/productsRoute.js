import express from 'express'
import {
  createProductController,
  getProductsController,
  getProductController,
} from '../controllers/productsController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const productRoutes = express.Router()

productRoutes
  .route('/')
  .get(getProductsController)
  .post(isLoggedIn, createProductController)

productRoutes.route('/:id').get(getProductController)

export default productRoutes
