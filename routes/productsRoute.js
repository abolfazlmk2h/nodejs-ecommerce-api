import express from 'express'
import {
  createProductController,
  getProductsController,
} from '../controllers/productsController.js'
import { isLoggedIn } from '../middlewares/isLoggedIn.js'

const productRoutes = express.Router()

productRoutes
  .route('/')
  .get(getProductsController)
  .post(isLoggedIn, createProductController)

export default productRoutes
