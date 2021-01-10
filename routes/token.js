const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const fs = require('fs')

const verifyToken = require('../middlewares/verifyToken')

const secretKey = fs.readFileSync(process.env.privateKeyPath, 'utf8')
console.log('cert secret key loaded from ' + process.env.privateKeyPath)

// get token from certificate private key
router.get('/', function(req, res, next) {
  const payload = { foo: 'bar' }
  const token = jwt.sign(payload, secretKey, { algorithm: 'RS256' })
  
  res.json({ success: true, access_token: token })
})

// verify token against certificate public key
router.get('/verify', verifyToken, function(req, res, next) {
  res.json({ success: true, status: 'token verified' })
})

exports.router = router
