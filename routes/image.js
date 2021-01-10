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
AWS.config.region = 'us-west-1';
const s3 = new AWS.S3()
const myBucket = process.env.s3Bucket

// get protected image from s3 via pre-signed URL
router.get('/*', verifyToken, function(req, res, next) {

  const myKey = req.url.substring(1) // get s3 key from request path - remove first slash
  const signedUrlExpireSeconds = 60 * 10

  s3.getSignedUrl('getObject', {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds
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
