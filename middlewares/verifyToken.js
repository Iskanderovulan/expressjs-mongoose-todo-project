import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {

    const token = req.body.token || req.query.token || req.headers['x-access-token']
    // console.log(token)
    if (!token) {
        return res.status(403).send('Authorization header missing')
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
    } catch (err) {
        return res.status(401).send('Invalid or expired token')
    }
    return next()
}

export { verifyToken }