var express = require('express');
var router = express.Router();

/* GET token. */
router.get('/', function(req, res, next) {
  res.send('getToken');
});

module.exports = router;
