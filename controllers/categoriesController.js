import Category from '../model/Category.js'

// @desc Create new category
// @route POST /api/v1/categories
// @access Private/Admin

export async function createCategoryController(req, res, next) {
  try {
    const { name } = req.body
    const categoryFound = await Category.findOne({ name })

    if (categoryFound) throw new Error('Category already exists')

    const category = await Category.create({
      name,
      user: req.userAuthId,
    })

    return res.json({
      status: 'success',
      message: 'Category created successfully',
      category,
    })
  } catch (error) {
    next(error)
  }
}
