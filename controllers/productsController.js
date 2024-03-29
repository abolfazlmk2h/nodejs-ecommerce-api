import Product from '../model/Product.js'

// @desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

export async function createProductController(req, res, next) {
  try {
    const {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    } = req.body
    const productExists = await Product.findOne({ name })

    if (productExists) throw new Error('Product Already Exists')

    const product = await Product.create({
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user: req.userAuthId,
      price,
      totalQty,
    })

    return res.json({
      status: 'Success',
      message: 'Product created successfully',
      product,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Get all products
// @route Get /api/v1/products
// @access Public

export async function getProductsController(req, res) {
  let productQuery = Product.find()

  if (req.query.name) {
    productQuery = productQuery.find({
      name: { $regex: req.query.name, $options: 'i' },
    })
  }
  if (req.query.brand) {
    productQuery = productQuery.find({
      brand: { $regex: req.query.brand, $options: 'i' },
    })
  }
  if (req.query.category) {
    productQuery = productQuery.find({
      category: { $regex: req.query.category, $options: 'i' },
    })
  }
  if (req.query.colors) {
    productQuery = productQuery.find({
      colors: { $regex: req.query.colors, $options: 'i' },
    })
  }
  if (req.query.sizes) {
    productQuery = productQuery.find({
      sizes: { $regex: req.query.sizes, $options: 'i' },
    })
  }
  if (req.query.price) {
    const [minPrice, maxPrice] = req.query.price.split('-')
    productQuery = productQuery.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
  }

  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const total = await Product.countDocuments()

  productQuery = productQuery.skip(startIndex).limit(limit)

  const pagination = {}

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    }
  }

  const products = await productQuery

  return res.json({
    status: 'success',
    total,
    results: products.length,
    pagination,
    message: 'Products fetched successfully',
    products,
  })
}

// @desc Get single product
// @route Get /api/v1/products/:id
// @access Public

export async function getProductController(req, res, next) {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) throw new Error('Product not found')

    return res.json({
      status: 'success',
      message: 'Product fetched successfully',
      product,
    })
  } catch (error) {
    next(error)
  }
}

// @desc Update product
// @route PUT /api/v1/products/:id/update
// @access Private/Admin

export async function updateProductController(req, res, next) {
  try {
    const {
      name,
      description,
      brand,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
    } = req.body

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        brand,
        category,
        sizes,
        colors,
        user,
        price,
        totalQty,
      },
      {
        new: true,
      }
    )

    return res.json({
      status: 'success',
      message: 'Product updated successfully',
      product,
    })
  } catch (error) {
    next(error)
  }
}

// @desc Delete product
// @route DELETE /api/v1/products/:id/delete
// @access Private/Admin

export async function deleteProductController(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    return res.json({
      status: 'success',
      message: 'Product deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}
