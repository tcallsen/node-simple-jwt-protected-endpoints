const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const fs = require('fs')

const verifyToken = require('../middlewares/verifyToken')

const secretKey = fs.readFileSync(process.env.privateKeyPath, 'utf8')
console.log('cert secret key loaded from file path: ' + process.env.privateKeyPath)

// route: get token from certificate private key
router.get('/', function(req, res, next) {
  
  // payload defines access to specific routes (by URL path)
  const payload = { access: [
    '/token',
    '/token/verify',
    '/image',
    // '/image/metadata'
  ]}

  const token = jwt.sign(payload, secretKey, { algorithm: 'RS256', expiresIn: 60 * 10 })
  
  res.json({ success: true, access_token: token })
})

// route: verify token against certificate public key
router.get('/verify', verifyToken, function(req, res, next) {
  res.json({ success: true, status: 'token verified' })
})

exports.router = router
