const express = require('express')
const router = express.Router()

const verifyToken = require('../middlewares/verifyToken')

const fs = require('fs')

// get image
router.get('/', verifyToken, function(req, res, next) {

  const s = fs.createReadStream('./sample_data/image.jpg');
  s.on('open', function () {
    res.set('Content-Type', 'image/jpeg');
    s.pipe(res)
  })
  
})

module.exports = router
