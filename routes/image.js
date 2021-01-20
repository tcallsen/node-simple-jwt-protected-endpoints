const express = require('express')
const router = express.Router()

const fs = require('fs')
const path = require('path')

const verifyToken = require('../middlewares/verifyToken')

// get image
router.get('/', verifyToken, function(req, res, next) {

  const s = fs.createReadStream(path.join(__dirname, '..', 'sample_data', 'image.jpg'))
  s.on('open', function () {
    res.set('Content-Type', 'image/jpeg');
    s.pipe(res)
  })
  
})

// get image metadata
router.get('/metadata', verifyToken, function(req, res, next) {
  res.setHeader('Content-Type', 'application/json')
  res.sendFile(path.join(__dirname, '..', 'sample_data' , 'metadata.json'))
})

module.exports = router
