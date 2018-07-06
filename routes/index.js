var express = require('express');
var router = express.Router();

//route Leading user to indexModel

router.get('/', function(req, res, next) {
  res.render('users', { title: 'ProjecThree' });
});

module.exports = router;
