import { getTokenFromHeader } from '../utils/getTokenFromHeader.js'
import { verifyToken } from '../utils/verifyToken.js'

export function isLoggedIn(req, res, next) {
  const token = getTokenFromHeader(req)
  const decodedUser = verifyToken(token)

  if (!decodedUser)
    throw new Error('Token expired or invalid. Please try again')

  req.userAuthId = decodedUser?.id
  next()
}
