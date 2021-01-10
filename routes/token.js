const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const fs = require('fs')

const secretKey = fs.readFileSync(process.env.privateKeyPath, 'utf8')
const publicCert = fs.readFileSync(process.env.publicKeyPath, 'utf8')

// get token from certificate private key
router.get('/', function(req, res, next) {
  const payload = { foo: 'bar' }
  const token = jwt.sign(payload, secretKey, { algorithm: 'RS256' })
  
  res.json({ success: true, access_token: token })
})

// verify token against certificate public key
router.get('/verify', function(req, res, next) {
  if (verifyToken(req)) res.json({ success: true, status: 'token verified' })
  else res.status(401).json({ success: false, status: 'failed to verify token' })
})

exports.router = router

// token verification utility function (exported below)
const verifyToken = function(req) {
  try {
    const authorizationHeader = req.headers['authorization']
    const authorziation = authorizationHeader.split(' ')
    const bearerToken = authorziation[1]
    jwt.verify(bearerToken, publicCert, { algorithm: 'RS256' })

    return true
  } catch (e) {
    console.error('failed to parse token - may be missing Authorization header', e)
  }

  return false
}

exports.verifyToken = verifyToken