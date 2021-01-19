const jwt = require('jsonwebtoken')
const fs = require('fs')

const publicCert = fs.readFileSync(process.env.publicKeyPath, 'utf8')
console.log('cert public key loaded from file path: ' + process.env.publicKeyPath)

// token verification middleware
const verifyToken = (req, res, next) => {
  try {

    // get bearer token
    const authorizationHeader = req.headers['authorization']
    const authorziation = authorizationHeader.split(' ')
    const bearerToken = authorziation[1]

    // confirm requested route is granted in access array of payload
    jwt.verify(bearerToken, publicCert, { algorithm: 'RS256' }, (err, payload) => {
      if (err) throw err
      else {
        if (payload.access.includes(req.originalUrl)) next()
        else throw { message: 'requested url not granted in token' }
      }
    })

  } catch (e) {
    res.status(401).json({ success: false, status: 'failed to verify token', error: e })
  }
}

module.exports = verifyToken