import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import dbConnect from '../config/dbConnect.js'
import userRoutes from '../routes/usersRoute.js'
import productRoutes from '../routes/productsRoute.js'
import categoryRoutes from '../routes/categoriesRoute.js'
import { globalErrHandler, notFound } from '../middlewares/globalErrHandler.js'

dbConnect()
const app = express()

app.use(express.json())
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/products', productRoutes)
app.use('/api/v1/categories', categoryRoutes)

app.use(notFound)
app.use(globalErrHandler)

export default app
