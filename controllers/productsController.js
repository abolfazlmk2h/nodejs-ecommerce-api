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

  const products = await productQuery
  return res.json({
    status: 'success',
    products,
  })
}
