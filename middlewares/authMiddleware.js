const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next) => {
    let token = req.header('auth-token')

    if(!token){
        return res.status(401).json({ msg: 'You are not authorized!' })
    }

    jwt.verify(token, process.env.SECRETKEY, (err, payload) => {
        if (err) {
            throw err
        }

        req.userId = payload.userId
        next()
    })
}