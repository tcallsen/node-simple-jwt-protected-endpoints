const jwt = require('jsonwebtoken')

// load certificate public key from website ssl cert
const sslCertificate = require('get-ssl-certificate')
let publicCert
sslCertificate.get(process.env.publicKeyCertUrl).then(function (certificate) {
  publicCert = certificate.pemEncoded
  console.log('cert public key loaded from url: ' + process.env.publicKeyCertUrl)
})

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