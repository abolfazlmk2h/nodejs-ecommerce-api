export default function globalErrHandler(err, req, res, next) {
  const stack = err?.stack
  const statusCode = err?.statusCode ? err?.statusCode : 500
  const message = err?.message

  return res.status(statusCode).json({ stack, message })
}
