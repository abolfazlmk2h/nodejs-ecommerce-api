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
  const products = await Product.find()
  return res.json({
    status: 'success',
    products,
  })
}
