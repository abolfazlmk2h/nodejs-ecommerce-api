export function getTokenFromHeader(req) {
  const token = req?.headers?.authorization?.split(' ')[1]

  return token ? token : 'No token found!'
}
