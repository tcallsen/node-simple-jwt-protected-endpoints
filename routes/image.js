const express = require('express')
const router = express.Router()

const verifyToken = require('./token').verifyToken;

// get protected image from s3 via pre-signed URL
router.get('/', function(req, res, next) {
  if (verifyToken(req)) {
    res.json({ success: true, status: 'image token verified' })
  } else res.status(401).json({ success: false, status: 'failed to verify token' })
})

module.exports = router
