const jwt = require('jsonwebtoken')
const fs = require('fs')

const publicCert = fs.readFileSync(process.env.publicKeyPath, 'utf8')
console.log('cert public key loaded from ' + process.env.publicKeyPath)

// token verification middleware
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization']
    const authorziation = authorizationHeader.split(' ')
    const bearerToken = authorziation[1]
    jwt.verify(bearerToken, publicCert, { algorithm: 'RS256' })

    next()
  } catch (e) {
    res.status(401).json({ success: false, status: 'failed to verify token', error: e })
  }
}

module.exports = verifyToken