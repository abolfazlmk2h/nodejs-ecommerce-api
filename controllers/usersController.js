import bcrypt from 'bcryptjs'
import User from '../model/User.js'
import generateToken from '../utils/generateToken.js'
import { getTokenFromHeader } from '../utils/getTokenFromHeader.js'
import { verifyToken } from '../utils/verifyToken.js'

// @desc Register user
// @route POST /api/v1/users/register
// @access Private/Admin

export async function registerUserController(req, res, next) {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })

  try {
    if (userExists) throw new Error('User already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return res.status(201).json({
      status: 'success',
      msg: 'User Registered Successfully',
      data: user,
    })
  } catch (err) {
    next(err)
  }
}

// @desc Login user
// @route POST /api/v1/users/login
// @access Private/Admin

export async function loginUserControl(req, res, next) {
  const { email, password } = req.body
  const userFound = await User.findOne({ email })

  try {
    if (userFound && (await bcrypt.compare(password, userFound?.password))) {
      return res.json({
        status: 'success',
        msg: 'Login Success',
        userFound,
        token: generateToken(userFound?._id),
      })
    } else {
      throw new Error('Invalid login details')
    }
  } catch (err) {
    next(err)
  }
}

// @desc Get user profile
// @route POST /api/v1/users/profile
// @access Private

export async function getUserProfileController(req, res, next) {
  const token = getTokenFromHeader(req)
  const verified = verifyToken(token)
  console.log(req)
  return res.json({
    msg: 'Get Profile',
  })
}
