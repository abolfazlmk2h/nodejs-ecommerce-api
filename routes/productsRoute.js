import express from 'express'
import {
  createProductController,
  getProductsController,
  getProductController,
  updateProductController,
  deleteProductController,
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
  .delete(isLoggedIn, deleteProductController)

export default productRoutes
