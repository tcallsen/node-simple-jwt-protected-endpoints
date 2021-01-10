const express = require('express')
const router = express.Router()

const verifyToken = require('../middlewares/verifyToken')

const AWS = require('aws-sdk')
AWS.config.update({
  apiVersion: "2010-12-01",
  accessKeyId: process.env.s3AccessKey,
  secretAccessKey: process.env.s3SecretKey,
  region: process.env.s3region
})
const s3 = new AWS.S3()
const s3Bucket = process.env.s3Bucket

// get protected image from s3 via pre-signed URL
router.get('/*', verifyToken, function(req, res, next) {

  // derive s3 key from request path and remove first slash
  const s3ImageKey = req.url.substring(1)

  s3.getSignedUrl('getObject', {
    Bucket: s3Bucket,
    Key: s3ImageKey,
    Expires: 60 * 10 // seconds
  }, function (err, url) {
    if (!err) res.redirect(url)
    else {
      res.status(500).json({
        success: false,
        status: err,
        url: url
      })
    }
  })
})

module.exports = router
