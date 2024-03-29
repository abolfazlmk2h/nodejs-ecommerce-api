import express from 'express'
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
} from '../controllers/productsController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const productRoutes = express.Router()

productRoutes
  .route('/')
  .get(getProductsController)
  .post(isLoggedIn, createProductController)

productRoutes
  .route('/:id')
  .get(getProductController)
  .put(isLoggedIn, updateProductController)

export default productRoutes
